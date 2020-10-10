import API from '../net/net';
import CONFIG from '../config/config';

export function _print(o, key)
{
  console.log(JSON.stringify(o, 0, '  '));
}

export async function read_license(name)
{
  let r, param;

  param = {
    name: name
  }

  _print(
    r = await API.run(param, CONFIG.master.url,  '/platform/controller/license/read'),
    null
  );

  return r;
}

export async function write_license(name, l)
{
  let r, param;

  param = {
    name: name,
    license: l.license,
    user_id: l.user_id
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/license/write'),
    null
  );

  return r;
}

export async function read_password(name)
{
  let r, param;

  param = {
    name: name
  }

  _print(
    r = await API.run(param, CONFIG.master.url,  '/platform/controller/password/read'),
    null
  );

  return r;
}

export async function write_password(name, p)
{
  let param, r;

  param = {
    name: name,
    user_id: p.user_id,
    password: p.password
  }

  _print(
    r = await API.run(param, CONFIG.master.url, '/platform/controller/password/write'),
    null
  )

  return r;
}

