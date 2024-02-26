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
    init_message("/exch/scheme1/lcp", {token: ret.result.token});

    return 1;
  }

  return 0
}

export async function create_lcDepositeLock(arg)
{
  let data = {
    auth: {
      token: arg.token
    },
    param: {
      req_id: arg.req_id,
      frag_id: arg.frag_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/exch/scheme1/transfer/fragment/lcDepositeLock/write');

  /*if(ret.status == "err") {
    return ret;
  }*/

  _print(ret, null);

  return ret;
}

export async function create_lcDeposite(arg)
{
  let data = {
    auth: {
      token: arg.token
    },
    param: {
      lock_id: arg.lock_id,
      txid: arg.txid
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/exch/scheme1/transfer/fragment/lcDeposite/write');

  /*if(ret.status == "err") {
    return ret;
  }*/

  _print(ret, null);

  return ret;
}

const D = {
  /*security*/
  signin:			signin,

  create_lcDepositeLock:	create_lcDepositeLock,
  create_lcDeposite:		create_lcDeposite
};

export default D;

