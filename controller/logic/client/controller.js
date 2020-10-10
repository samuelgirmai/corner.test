import API from '../../net/net';
import CONFIG from '../../config/config'

import {
  _print,
  read_license,
  write_license
} from '../tools'

async function _create(cnf)
{
  let r, i, data;

  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r;
  }

  data = {
    auth: {
      license: r.result.linfo.license
    },
    param: {
      cii: cnf.cii
    }
  }

  _print(
    r = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/client/write'),
    null
  );

  if(r.status == "err") {
    return r;
  }

  data.param['uid'] = r.result.user_id;

  _print(
    i = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/license/issue'),
    null
  );

  if(i.status == "err") {
    return i;
  }

  r = await write_license(cnf.name, {user_id: r.result.user_id, license: i.result.license});

  return r;
}

export async function _allow(cnf)
{
  let r, data, c;

  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r;
  }

  c = await read_license(cnf.name);

  data = {
    auth: {
      license: r.result.linfo.license
    },
    param: {
      uid: c.result.linfo.user_id,
      caps: cnf.caps
    }
  }

  _print(
    r = await API.run(data, CONFIG.proxy.url, '/platform/auth/cap/list/allow'),
    null
  );

  return r;
}

export async function create()
{
  var r;

  await _create(require('./setup').system);
  //await _create(require('./setup').console);
  await _create(require('./setup').admin);
  await _create(require('./setup').issuance);
}

export async function allow()
{
  let r;

  await _allow(require('./setup').system);
  await _allow(require('./setup').issuance);
  r = await _allow(require('./setup').admin);

  /*return last message*/

  return r;
}

