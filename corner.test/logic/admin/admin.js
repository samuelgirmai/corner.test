import API from '../../tools/net';
import CONFIG from './config/config'

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

export async function create_user(token)
{
  let ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let u = {
    name: "system",
    fname: "corner",
    gfname: "abebe",
    mname: "fana",
    mfname: "salsawi",
    gender: "F",
    dob: "12/12/2000",
    address: {
      region: "Tigray",
      city: "Mekelle",
      woreda: "Hadinet",
      tabiya: "Hosana",
      ketena: "32",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      pii: u,
      //user_type: 'admin'
      user_type: 'system'
      //user_type: 'console'
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/write');

  _print(ret, null);

}

export async function remove_user(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    },
    param: {
      user_id: "446219",
      user_type: "system"
      //user_type: "console"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/delete');

  _print(ret, null);
}

export async function list_users(token)
{
  let ret, data;;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    },
   param: {
     user_type: 'system',
     pagin: {page: 1, size: 2, order_type: 'asc'}
   }
  },

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/list');

  _print(ret, null);
}

export async function assign_role(token)
{
  let ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }
 
  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      user_id: "446219"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/role/write');
  
  _print(ret, 'ret');
}

export async function revoke_role(token)
{
  let ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    },
    param: {
      user_id: "446219",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/role/delete');

  _print(ret, null);
}

export async function get_role(token)
{
  let ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    },
    param: {
      user_id: "446219",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/role/read');

  _print(ret, null);
}

export async function signin()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: "537241",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}


export async function get_stats(token)
{
  let ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/stats/read');

  _print(ret, null);
}

