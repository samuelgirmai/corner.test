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

export async function create_data(token, data1)
{
  if(!token) {
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token
    },
    param: {
      data1: data1
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/data/write');

  _print(ret, null);
}

export async function get_data(token, data_id)
{
  if(!token) {
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token
    },
    param: {
      data_id: data_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/data/read');

  _print(ret, null);
}

export async function modify_data(token, data_id, data1)
{
  if(!token) {
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token
    },
    param: {
      data_id: data_id,
      data1: data1
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/data/update');

  _print(ret, null);
}

export async function remove_data(token, data_id)
{
  if(!token) {
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token
    },
    param: {
      data_id: data_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/data/delete');

  _print(ret, null);
}

export async function list_data(token)
{
  if(!token) {
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token
    },
    param: {}
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/data/list/read');

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

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/user/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}

export async function signout(token)
{
  if(!token) {
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

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/user/access/delete');

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

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dummy/user/security/update');

  _print(ret, null);
}

const D = {
  /*security*/
  signin:		signin,
  signout:		signout,
  change_passwd:	change_passwd,

  /*logic*/
  get_data:		get_data,
  create_data:		create_data,
  modify_data:		modify_data,
  remove_data:		remove_data,
  list_data:		list_data
};

export default D;

