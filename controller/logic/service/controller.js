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

async function configure_service(cnf)
{
  let r;
  let param = {service: null};

  param.service = cnf;

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/config/update'),
    null
  );

  return r;
}

async function install_service(cnf)
{
  let r;
  let param = {service: null};

  param.service = cnf;

  if(root_license){
    param.service["license"] = root_license;
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/setup/update'),
    null
  );

  return r;
}

async function allow_service(cnf)
{
  let r;
  let param = {service: null};

  param.service = cnf;

  if(root_license){
    param.service["license"] = root_license;
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/cap/list/allow'),
    null
  );

  return r;
}

async function start_service(name, state)
{
  let r;
  let param = {service: null};

  param.service = {
    name: name,
    state: state
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/state/update'),
    null
  );

  return r;
}

async function reboot()
{
  let r;
  let param = {};

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/reboot'),
    null
  );

  return r;
}

export async function configure()
{
  await configure_service(require('./setup').filesystem);
  await configure_service(require('./setup').muxer);
  await configure_service(require('./setup').auth);
  await configure_service(require('./setup').stream);
  await configure_service(require('./setup').notif);
  await configure_service(require('./setup').finance);
  await configure_service(require('./setup').payment);
  await configure_service(require('./setup').admin);
  await configure_service(require('./setup').system);
  await configure_service(require('./setup').asset);
  await configure_service(require('./setup').ashera);

  await configure_service(require('./setup').issuance);

  await reboot();
}

export async function mkfs()
{
  await install_service(require('./setup').filesystem, null);

  await reboot();
}

export async function install()
{
  var r;

  let param = {service: null};

  await install_service(require('./setup').muxer, null);
  r = await install_service(require('./setup').auth, null);

  await start_service("corner.muxer", "config");
  await start_service("corner.auth", "config");

  root_license = r.result.client.license;

  await install_service(require('./setup').stream);
  await install_service(require('./setup').notif);
  await install_service(require('./setup').finance);
  await install_service(require('./setup').payment);
  await install_service(require('./setup').admin);
  await install_service(require('./setup').system);
  await install_service(require('./setup').asset);
  await install_service(require('./setup').ashera);

  await install_service(require('./setup').issuance);

  var root = {
    name: "corner.root",
    user_id: r.result.client.user_id,
    license: r.result.client.license
  }

  await write_license(root);

  await reboot();

  return true
}

export async function allow()
{
  root_license = (await read_license("corner.root")).license;

  await start_service("corner.muxer", "config");
  await start_service("corner.auth", "config");

  await allow_service(require('./setup').auth);
  await allow_service(require('./setup').stream);
  await allow_service(require('./setup').notif);
  await allow_service(require('./setup').finance);
  await allow_service(require('./setup').payment);
  await allow_service(require('./setup').admin);
  await allow_service(require('./setup').system);
  await allow_service(require('./setup').asset);
  await allow_service(require('./setup').ashera);

  await allow_service(require('./setup').issuance);

  await reboot();

  return true
}

export async function start()
{
  //highly probable that the fs is going to be
  //started by the storage technology

  await start_service("corner.muxer", "start");
  await start_service("corner.auth", "start");
  await start_service("corner.stream", "start");
  await start_service("corner.notif", "start");
  await start_service("corner.finance", "start");
  await start_service("corner.payment", "start");
  await start_service("corner.admin", "start");
  await start_service("corner.system", "start");
  await start_service("corner.asset", "start");
  await start_service("corner.ashera", "start");

  await start_service("corner.issuance", "start");
}

export async function get_info()
{
  let ret;

  let param = {};

  ret = await API.run(param, CONFIG.master.url, '/platform/controller/info/read');

  _print(ret, null);

  return ret;
}

