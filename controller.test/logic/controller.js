import fs from 'fs'
import API from '../tools/net';
import CONFIG from '../config/config'

var root_license = null;

async function read_license()
{
  if(!fs.existsSync(__dirname+"/root/client.lic")){
    return 0;
  }

  return JSON.parse(fs.readFileSync(__dirname+"/root/client.lic", 'utf8'));
}

async function write_license(license)
{
  if(!fs.existsSync(__dirname+"/root/client.lic")){
    return 0;
  }

  fs.writeFileSync(__dirname+"/root/client.lic", JSON.stringify(license, 0, '  '), 'utf8');

  return 1;
}

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
    r = await API.run(CONFIG.master.url, param, '/platform/controller/config/update'),
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
    r = await API.run(CONFIG.master.url, param, '/platform/controller/setup/update'),
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
    r = await API.run(CONFIG.master.url, param, '/platform/controller/caps/allow'),
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
    r = await API.run(CONFIG.master.url, param, '/platform/controller/state/update'),
    null
  );

  return r;
}

async function reboot()
{
  let r;
  let param = {};

  _print(
    r = await API.run(CONFIG.master.url, param, '/platform/controller/reboot'),
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
  await configure_service(require('./setup').corner_notif);
  await configure_service(require('./setup').mru);
  await configure_service(require('./setup').triage);
  await configure_service(require('./setup').practner);
  await configure_service(require('./setup').infotics);
  await configure_service(require('./setup').lab);
  await configure_service(require('./setup').pharmacy);
  await configure_service(require('./setup').finance);
  await configure_service(require('./setup').payment);
  await configure_service(require('./setup').admin);
  await configure_service(require('./setup').emr_notif);
  await configure_service(require('./setup').storeSimulator);

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
  await install_service(require('./setup').corner_notif);
  await install_service(require('./setup').mru);
  await install_service(require('./setup').triage);
  await install_service(require('./setup').practner);
  await install_service(require('./setup').infotics);
  await install_service(require('./setup').lab);
  await install_service(require('./setup').pharmacy);
  await install_service(require('./setup').finance);
  await install_service(require('./setup').payment);
  await install_service(require('./setup').admin);
  await install_service(require('./setup').emr_notif);
  await install_service(require('./setup').storeSimulator);

  await write_license(r.result.client);

  await reboot();
}

export async function allow()
{
  root_license = (await read_license()).license;

  await start_service("corner.muxer", "config");
  await start_service("corner.auth", "config");

  await allow_service(require('./setup').auth);
  await allow_service(require('./setup').stream);
  await allow_service(require('./setup').corner_notif);
  await allow_service(require('./setup').mru);
  await allow_service(require('./setup').triage);
  await allow_service(require('./setup').practner);
  await allow_service(require('./setup').infotics);
  await allow_service(require('./setup').lab);
  await allow_service(require('./setup').pharmacy);
  await allow_service(require('./setup').finance);
  await allow_service(require('./setup').payment);
  await allow_service(require('./setup').admin);
  await allow_service(require('./setup').emr_notif);
  await allow_service(require('./setup').storeSimulator);

  await reboot();
}

export async function start()
{
  //highly probable that the fs is going to be
  //started by the storage technology

  await start_service("corner.muxer", "start");
  await start_service("corner.auth", "start");
  await start_service("corner.stream", "start");
  await start_service("corner.notif", "start");

  await start_service("emr.mru", "start");
  await start_service("emr.triage", "start");
  await start_service("emr.practner", "start");
  await start_service("emr.infotics", "start");
  await start_service("emr.lab", "start");
  await start_service("emr.pharmacy", "start");
  await start_service("emr.finance", "start");
  await start_service("emr.payment", "start");
  await start_service("emr.admin", "start");
  await start_service("emr.notif", "start");
  await start_service("emr.storeSimulator", "start");
}

export async function get_info()
{
  let ret;

  let data = {};

  ret = await API.run(CONFIG.master.url, data, '/platform/controller/info/read');

  _print(ret, null);

  return ret;
}

