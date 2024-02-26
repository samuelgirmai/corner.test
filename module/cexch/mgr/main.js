import {CTX_put} from '../../../core/logic'

import STREAM from './tools/stream/stream'
import API from './tools/net'
import CONFIG from './config/config'

import H from './handler.js'


function _print(o, key)
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  /*if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }*/

  console.log(JSON.stringify(o, 0, '  '));
}

async function init_message(st, auth)
{
  let r = await STREAM.connect(CONFIG.stream.url, st, auth);

  if(!r) {
    console.log('can not connect');
    return 0;
  }

  STREAM.listen(st, H);
}

export async function signin(arg, ctx)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: arg.auth.username,
      password: arg.auth.password
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/exch/scheme1/user/access/write');

  CTX_put(ctx, "token", ret.result.token);

  if(ret.status == "ok") {
    init_message("/exch/scheme1/mgr", {token: ret.result.token});

    return 1;
  }

   return 0
}

export async function create_fcDepositeComplete(arg)
{
  let data = {
    auth: {
      token: arg.token
    },
    param: {
      fcDeposite_id: arg.fcDeposite_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/exch/scheme1/transfer/fcDepositeComplete/write');

  if(ret.status == "err") {
    return 0;
  }

  _print(ret, null);

  return 1;
}

export async function create_fragment(arg)
{
  let data = {
    auth: {
      token: arg.token
    },
    param: {
      req_id: arg.req_id,
      frag_cnt: arg.frag_cnt
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/exch/scheme1/transfer/fragment/write');

  if(ret.status == "err") {
    return 0;
  }

  _print(ret, null);

  return 1;
}

const D = {
  /*security*/
  signin:			signin,

  /*logic*/
  create_fcDepositeComplete:	create_fcDepositeComplete,
  create_fragment:		create_fragment
};

export default D;

