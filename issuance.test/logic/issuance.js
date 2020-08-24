import API from '../tools/net'
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

  /*if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }*/

  console.log(JSON.stringify(o, 0, '  '));
}

export async function get_pending(token)
{
  if(!token){
    console.log('   [!] not logged in?');
    return ["NOT_LOGGED_IN"]
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      state: "PENDING"
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/list/read');

  if(ret.status == "err"){
    return ["EMPTY"]
  }

  return ret.result.list.map((i)=>{return i.reg_id});
}

export async function list_identity(token, state)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      state: state
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/list/read');

  _print(ret, null);
}

export async function create_identity(token, pii)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: { 
      pii: pii
    }
  }
  
  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/write');
  
  _print(ret, null);
}

export async function create_photo(token, reg_id, photo)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      cb: "/platform/issuance/identity/photo/write",
      param: {
        reg_id: reg_id
      }
    },
    file: photo
  }

  let ret = await API.run2(data, CONFIG.asset.url, '/platform/asset/file/write');

  _print(ret, null);
}

export async function modify_identity(token, reg_id, pii)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      reg_id: reg_id,
      pii: pii
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/update');

  _print(ret, null);
}

export async function modify_photo(token, reg_id, photo)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      reg_id: reg_id,
      photo: photo
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/photo/update');

  _print(ret, null);
}

export async function remove_identity(token, reg_id)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      reg_id: reg_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/delete');

  _print(ret, null);
}

export async function issue_identity(token, reg_id)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      reg_id: reg_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/issue');

  _print(ret, null);
}

export async function get_identity(token, reg_id)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      reg_id: reg_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/identity/read');

  _print(ret, null);
}

export async function get_auth_identity(token, user_id)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      user_id: user_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/auth/identity/read');

  _print(ret, null);
}

export async function signin(p)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: p.username,
      password: p.password
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/user/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}

export async function signout(token)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      token: token
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/user/access/delete');

  _print(ret, null);
}

export async function change_passwd(token, p)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      username: p.username,
      oldpassword: p.oldpassword,
      newpassword: p.newpassword
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/issuance/user/security/update');

  _print(ret, null);
}

const I = {
  /*security*/
  signin:		signin,
  signout:		signout,
  change_passwd:	change_passwd,

  /*identity management*/
  list_identity:	list_identity,
  create_identity:	create_identity,
  modify_identity:	modify_identity,
  remove_identity:	remove_identity,
  create_photo:		create_photo,
  modify_photo:		modify_photo,
  issue_identity:	issue_identity,
  get_identity:		get_identity,
  get_auth_identity:	get_auth_identity,

  /*misc*/
  get_pending:		get_pending
};

export default I;

