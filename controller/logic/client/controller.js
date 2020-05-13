import fs from 'fs'
import API from '../../tools/net';
import CONFIG from './config/config'

import {
  read_license,
  write_license
} from '../tools'

var root_license = null;

function _print(o, key) 
{
  console.log(JSON.stringify(o, 0, '  '));
}

async function _create(cnf)
{
  let r, data;

  root_license = (await read_license("corner.root")).license;

  data = {
    auth: {
      license: root_license
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
    return;
  }

  await write_license({
    name: cnf.name,
    user_id: r.result.user_id,
    license: r.result.license
  });
  
  return r;
}

export async function _allow(cnf)
{
  let r, data, client;

  root_license = (await read_license("corner.root")).license;

  client = await read_license(cnf.name);

  data = {
    auth: {
      license: root_license
    },
    param: {
      uid: client.user_id,
      caps: cnf.caps
    }
  }

  _print(
    r = await API.run(data, CONFIG.proxy.url, '/platform/auth/caps/allow'),
    null
  );

  if(r.status == "err") {
    return;
  }

  return r;
}

export async function create()
{
  var r;

  await _create(require('./setup').system);
  //await _create(require('./setup').console);
  await _create(require('./setup').admin);
}

export async function allow()
{
  var r;

  await _allow(require('./setup').system);
  //await _allow(require('./setup').console);
  await _allow(require('./setup').admin);
}

