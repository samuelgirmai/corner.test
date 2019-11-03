import API from '../tools/net';
import CONFIG from '../config/config'

function _print(o, key) 
{
  console.log(JSON.stringify(o, 0, '  '));
}

async function setup_service(setup, license)
{
  let r;
  let param = {service: null};

  param.service = setup;

  if(license){
    param.service["license"] = license
  }

  _print(
    r = await API.run(CONFIG.master.url, param, '/platform/controller/setup/update'),
    null
  );

  return r;
}

async function start_service(name)
{
  let r;
  let param = {service: null};

  param.service = {
    name: name,
    state: "start"
  }

  _print(
    r = await API.run(CONFIG.master.url, param, '/platform/controller/state/update'),
    null
  );

  return r;
}

export async function install()
{
  var r;
  let param = {service: null};
  let root_license;

  //await setup_service(require('./setup').filesystem, null);
  await setup_service(require('./setup').muxer, null);

  /*
   * return the license of the root client
   */
  r = await setup_service(require('./setup').auth, null);

  await start_service("corner.muxer");
  await start_service("corner.auth");

  root_license = r.result.client.license;

  await setup_service(require('./setup').stream, root_license);
  await setup_service(require('./setup').corner_notif, root_license);
  await setup_service(require('./setup').mru, root_license);
  await setup_service(require('./setup').triage, root_license);
  await setup_service(require('./setup').practner, root_license);
  await setup_service(require('./setup').infotics, root_license);
  await setup_service(require('./setup').lab, root_license);
  await setup_service(require('./setup').pharmacy, root_license);
  await setup_service(require('./setup').finance, root_license);
  await setup_service(require('./setup').payment, root_license);
  await setup_service(require('./setup').admin, root_license);
  await setup_service(require('./setup').emr_notif, root_license);
  await setup_service(require('./setup').storeSimulator, root_license);
}

export async function start()
{
  await start_service("corner.muxer");
  await start_service("corner.auth");
  await start_service("corner.stream");
  await start_service("corner.notif");

  await start_service("emr.mru");
  await start_service("emr.triage");
  await start_service("emr.infotics");
  await start_service("emr.lab");
  await start_service("emr.pharmacy");
  await start_service("emr.finance");
  await start_service("emr.payment");
  await start_service("emr.admin");
  await start_service("emr.notif");
  await start_service("emr.storeSimulator");
}

export async function get_info()
{
  let ret;

  let data = {};

  ret = await API.run(CONFIG.master.url, data, '/platform/controller/info/read');

  _print(ret, null);

  return ret;
}

