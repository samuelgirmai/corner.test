import API from '../../tools/net';
import CONFIG from './config/config'

var users = {
  admin: {
    name: "admin",
    fname: "user",
    gfname: "berhe",
    mname: "zimam",
    mfname: "tekeste",
    gender: "F",
    dob: "12/12/1989",
    address: {
      region: "tigray",
      city: "mekelle",
      woreda: "hawelti",
      tabiya: "walta",
      ketena: "32",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  },
  system: {
    name: "system",
    fname: "user",
    gfname: "abebe",
    mname: "fana",
    mfname: "salsawi",
    gender: "M",
    dob: "12/12/2000",
    address: {
      region: "tigray",
      city: "mekelle",
      woreda: "hadinet",
      tabiya: "hosana",
      ketena: "03",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  },
  console: {
    name: "console",
    fname: "user",
    gfname: "abdulhai",
    mname: "elham",
    mfname: "kalayu",
    gender: "M",
    dob: "01/11/1976",
    address: {
      region: "tigray",
      city: "mekelle",
      woreda: "quiha",
      tabiya: "keshi",
      ketena: "07",
      phone_number: "09"+Math.random().toString().slice(2,10)
    },
  },
  issuance: {
    name: "issuance",
    fname: "user",
    gfname: "worota",
    mname: "zemzem",
    mfname: "kiros",
    gender: "M",
    dob: "01/11/1986",
    address: {
      region: "tigray",
      city: "mekelle",
      woreda: "quiha",
      tabiya: "amora",
      ketena: "07",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }
}

var USER_PII = users["issuance"]
var USER_TYPE = "issuer"

/*filled manually or automatically at create_user*/
var USER_ID = "916549";

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

  let data = {
    auth: {
      token: token
    }, 
    param: {
      pii: USER_PII,
      user_type: USER_TYPE
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/write');

  console.log(JSON.stringify(ret, 0, '  '));

  USER_ID = ret.result.user.user_id;

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
      token: token
    },
    param: {
      user_id: USER_ID,
      user_type: USER_TYPE
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
      token: token
    },
    param: {
      user_type: USER_TYPE,
      pagin: {page: 1, size: 2, order_type: 'asc'}
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/user/list/read');

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
      token: token
    }, 
    param: {
      user_id: USER_ID
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
      token: token
    },
    param: {
      user_id: USER_ID,
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
      token: token
    },
    param: {
      user_id: USER_ID,
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
      username: "891889",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}

export async function signout(token)
{
  let ret;

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

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/access/delete');

  _print(ret, null);
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
      token: token
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/admin/stats/read');

  _print(ret, null);
}

