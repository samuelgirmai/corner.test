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

async function create_client(cnf)
{
  let r, data;

  root_license = (await read_license("root")).license;

  data = {
    auth: {
      license: root_license
    },
    param: {
      cii: cnf.cii
    }
  }

  _print(
    r = await API.run(CONFIG.proxy.url, data, '/platform/auth/users/client/write'),
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

export async function allow_client(cnf)
{
  let r, data, client;

  root_license = (await read_license("root")).license;

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
    r = await API.run(CONFIG.proxy.url, data, '/platform/auth/caps/allow'),
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

  await create_client(require('./setup').mru);
  await create_client(require('./setup').triage);
  await create_client(require('./setup').practner);
  await create_client(require('./setup').infotics);
  await create_client(require('./setup').lab);
  await create_client(require('./setup').pharmacy);
  await create_client(require('./setup').cashier);
  await create_client(require('./setup').admin);
}

export async function allow()
{
  var r;

  await allow_client(require('./setup').mru);
  await allow_client(require('./setup').triage);
  await allow_client(require('./setup').practner);
  await allow_client(require('./setup').infotics);
  await allow_client(require('./setup').lab);
  await allow_client(require('./setup').pharmacy);
  await allow_client(require('./setup').cashier);
  await allow_client(require('./setup').admin);
}

