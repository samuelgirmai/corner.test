import API from '../../net/net';
import CONFIG from '../../config/config'

import {
  _print,
  read_license,
  write_license
} from '../tools'

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

async function install_service(cnf, lic)
{
  let r, param;

  param = {service: null};
  param.service = cnf

  if(lic){
    r = await read_license(lic);

    if(r.status == "err") {
      return r;
    }

    param.service["license"] = r.result.linfo.license;
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/setup/update'),
    null
  );

  return r;
}

async function allow_service(cnf)
{
  let r, param;
    
  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r;
  }

  param = {service: null};
  param.service = cnf;
  param.service["license"] = r.result.linfo.license;
  
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
  //await configure_service(require('./setup').fsys);
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

  if(r.status == "err"){
    return r;
  }

  await start_service("corner.muxer", "config");
  await start_service("corner.auth", "config");

  if(r.status == "ok"){
    await write_license("corner.client.root", r.result.client)
  }

  //await install_service(require('./setup').fsys, "corner.client.root");
  await install_service(require('./setup').stream, "corner.client.croot");
  await install_service(require('./setup').notif, "corner.client.root");
  await install_service(require('./setup').finance, "corner.client.root");
  await install_service(require('./setup').payment, "corner.client.root");
  await install_service(require('./setup').admin, "corner.client.root");
  await install_service(require('./setup').asset, "corner.client.root");
  await install_service(require('./setup').ashera, "corner.client.root");

  await install_service(require('./setup').issuance, "corner.client.root");

  r = await install_service(require('./setup').system, "corner.client.root");

  if(r.status == "ok"){
    await reboot();
  }

  /*return last message*/

  return r
}

export async function allow()
{
  let r;

  await start_service("corner.muxer", "config");
  await start_service("corner.auth", "config");

  await allow_service(require('./setup').auth);
  //await allow_service(require('./setup').fsys);
  await allow_service(require('./setup').stream);
  await allow_service(require('./setup').notif);
  await allow_service(require('./setup').finance);
  await allow_service(require('./setup').payment);
  await allow_service(require('./setup').admin);
  await allow_service(require('./setup').asset);
  await allow_service(require('./setup').ashera);
  await allow_service(require('./setup').issuance);

  r = await allow_service(require('./setup').system);

  if(r.status == "ok"){
    //await reboot();
  }

  /*return last message*/
  return r;
}

export async function start()
{
  //highly probable that the fs is going to be
  //started by the storage technology

  let r;

  await start_service("corner.muxer", "start");
  await start_service("corner.auth", "start");
  //await start_service("corner.fsys", "start");
  await start_service("corner.stream", "start");
  await start_service("corner.notif", "start");
  await start_service("corner.finance", "start");
  await start_service("corner.payment", "start");
  await start_service("corner.admin", "start");
  await start_service("corner.asset", "start");
  await start_service("corner.ashera", "start");
  await start_service("corner.issuance", "start");

  r = await start_service("corner.system", "start");

  /*return last message*/
  return r;
}

export async function get_info()
{
  let ret;

  let param = {};

  ret = await API.run(param, CONFIG.master.url, '/platform/controller/info/read');

  _print(ret, null);

  return ret;
}

