import API from '../tools/net';
import CONFIG from '../config/config'

function _print(o, key)
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }

  console.log(JSON.stringify(o, 0, '  '));
}

export async function issue_license(uid)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/license/issue');

  _print(ret, null);
}

export async function renew_license(uid)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/license/renew');

  _print(ret, null);
}

export async function revoke_license(uid)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/license/revoke');

  _print(ret, null);
}

export async function refresh_token(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      token
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/identity/token/refresh');

  _print(ret, null);
}
