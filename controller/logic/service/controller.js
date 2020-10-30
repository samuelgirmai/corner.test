import PROC from './proc'

export async function proc_reboot()
{
  return PROC.reboot();
}

export async function proc_info()
{
  return await PROC.info();
}

export async function proc_fs(proc, arg)
{
  let r, ctx;

  ctx = require('./ctx/fs');

  if(proc == "config") {
    return await PROC.config(ctx.corner);
  }

  if(proc == "setup") {
    return await PROC.setup(ctx[fs], null);
  }
}

export async function proc_basic(proc, arg)
{
  let r, ctx;

  ctx = require('./ctx/basic');

  if(proc == "config"){
    r = await PROC.config(ctx.muxer);
    if(r.status == "err"){
      return r;
    }

    return await PROC.config(ctx.auth);
  }

  if(proc == "session"){
    r = await PROC.session(ctx.muxer);

    if(r.status == "err") {
      return r;
    }

    return await PROC.session(ctx.auth);
  }

  if(proc == "setup"){
    r = await PROC.setup(ctx.muxer, arg);

    if(r.status == "err") {
      return r;
    }

    return await PROC.setup(ctx.auth, arg);
  }

  if(proc == "allow"){
    r = await PROC.allow(ctx.muxer);

    if(r.status == "err") {
      return r;
    }

    return await PROC.allow(ctx.auth);
  }

  if(proc == "state"){
    r = await PROC.state(ctx.muxer, arg);

    if(r.status == "err") {
      return r;
    }

    return await PROC.allow(ctx.auth, arg);
  }
}

export async function proc_third(proc, arg)
{
  let r, ctx, keys;

  ctx = require('./ctx/service');
  key = Object.keys(ctx);

  if(proc == "config"){
    for(let i = 0; i<key.length; i++){
      r = await PROC.config(ctx[key[i]])
    }
  }

  if(proc == "session"){
    for(let i = 0; i<key.length; i++){
      r = await PROC.session(ctx[key[i]])
    }
  }

  if(proc == "setup"){
    for(let i = 0; i<key.length; i++){
      r = await PROC.setup(ctx[key[i]], arg)
    }
  }

  if(proc == "allow"){
    for(let i = 0; i<key.length; i++){
      r = await PROC.allow(ctx[key[i]])
    }
  }

  if(proc == "state"){
    for(let i = 0; i<key.length; i++){
      r = await PROC.state(ctx[key[i]], arg)
    }
  }

  return r;
}

const CTRL = {
  proc_info:	proc_info,
  proc_fs:	proc_fs,
  proc_basic:	proc_basic,
  proc_third:	proc_third,
  proc_reboot:	proc_reboot
}

export default CTRL;
