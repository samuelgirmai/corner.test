import API from '../../net/net';
import CONFIG from '../../config/config'

import {
  _print,
  read_license,
  read_password,
  write_password
} from '../tools'

async function _create(cnf)
{
  let r, data;

  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r;
  }

  data = {
    auth: {
      license: r.result.linfo.license
    },
    param: {
      user_type: "admin",
      pii: cnf.pii
    }
  }

  _print(
    r = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/write'),
    null
  );

  if(r.status == "err") {
    return r;
  }

  await write_password(cnf.name, {user_id: r.result.user.user_id, password: "toor"});

  return r;
}

export async function _allow(cnf)
{
  let r, data, p;

  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r; 
  } 
  
  p = await read_password(cnf.name);

  if(p.status == "err") {
    return p; 
  } 
  
  data = {
    auth: {
      license: r.result.linfo.license
    },
    param: {
      user_id: p.result.pinfo.user_id,
      user_type: "admin"
    } 
  } 
  
  _print(
    r = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/role/write'),
    null
  );
  
  return r;
}

export async function create()
{
  let r;

  r = await _create(require('./setup').admin);

  return r;
}

export async function allow()
{
  let r;

  r = await _allow(require('./setup').admin);

  return r;
}

