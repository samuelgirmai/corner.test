import API from '../../net/net'
import CONFIG from '../../config/config'

import {
  _print,
  read_license,
  write_license
} from '../tools'

async function mkbootfs()
{
}

async function fsys(ctx)
{
  let r;

  let param = {
    name: ctx.name,
    arg: {
      version: ctx.version,
      config: ctx.conf,
      fsys: ctx.fsys
    }
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/fsys'),
    null
  );

  console.log("r = ", r);
  return r;
}

async function config(ctx)
{
  let r;
 
  let param = {
    name: ctx.name,
    arg: {
      version: ctx.version,
      config: ctx.conf
    }
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/config'),
    null
  );

  return r;
}

async function session(ctx)
{
  let r;
  
  let param = {
    name: ctx.name,
    arg: {
      version: ctx.version
    }
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/session'),
    null
  );

  return r;
}

async function setup(ctx, lic)
{
  let r;

  let param = {
    name: ctx.name,
    arg: {
      version: ctx.version,
      sii: ctx.sii,
      cii: ctx.cii
    }
  }

  if(lic){
    r = await read_license(lic);

    if(r.status == "err") {
      return r;
    }

    param.arg["license"] = r.result.linfo.license;
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/setup'),
    null
  );

  return r;
}

async function allow(ctx)
{
  let r;
    
  r = await read_license("corner.client.root");

  if(r.status == "err") {
    return r;
  }

  let param = {
    name: ctx.name,
    arg: {
      version: ctx.version,
      license: r.result.linfo.license,
      caps: ctx.caps
    }
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/allow'),
    null
  );

  return r;
}

async function state(ctx, state)
{
  let r;

  let param = {
    name: ctx.name,
    arg: {
      state: state
    }
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/state'),
    null
  );

  return r;
}

async function restore()
{
  let r;

  let param = {};

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/restore'),
    null
  );

  return r;
}

async function reboot()
{
  let r;
  let param = {};

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/boot/proc/reboot'),
    null
  );

  return r;
}

async function info()
{
  let r, param = {};

  r = await API.run(param, CONFIG.master.url, '/platform/boot/info/read');

  return r;
}

const PROC = {
  fsys:		fsys,
  config:	config,
  session:	session,
  setup:	setup,
  allow:	allow,
  state:	state,
  restore:	restore,
  reboot:	reboot,
  info:		info
}

export default PROC
