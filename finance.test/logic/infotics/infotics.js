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

export async function create_user()
{
  let ret;

  let u = {
    name: "Abebe",
    fname: "Adane",
    gfname: "Girma",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/1999",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      house_number: "122",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      pii: u
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/write');

  _print(ret, null);
}

export async function get_user()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "886264"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/read');

  _print(ret, null);
}

export async function list_users()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/list');

  _print(ret, null);
}

export async function change_passwd(token)
{
  let ret;

  let security = {
    username: "886264",
    oldpassword: "k$H2t#N0",
    password: "j@G3n)O2",
  }

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
      security: security
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/security/update');

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
      username: "415122",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/access/write');
  
  _print(ret, 'token');

  return ret.status == "ok"?ret.result.token: null;
}

export async function signout(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      token: token
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/user/access/delete');

  _print(ret, null);
}

export async function create_idata(token)
{
  let ret, drug;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  drug = {
    name: 'paracetamol'
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      type: 'drug',
      data: drug
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/idata/write');

  _print(ret, null);

}

export async function read_idata(token)
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
      type: 'drug',
      iid: "972553"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/idata/read');

  _print(ret, null);
}

export async function list_idata(token)
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
      type: 'drug'
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/infotics/idata/list');

  _print(ret, null);
}
