import API from '../../tools/net';
import CONFIG from '../../config/config'

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
    name: "Yohanes",
    fname: "Adane",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/2011",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "0910897726"
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

  ret = await API.run(data, '/app/emr/pharmacy/user/write');

  _print(ret, null);

}

export async function read_user()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "038868"
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/user/read');

  _print(ret, null);
}

export async function change_passwd(token)
{
  let ret;

  let security = {
    username: "923165",
    oldpassword: "f%L0x$N1",
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

  ret = await API.run(data, '/app/emr/pharmacy/user/security/update');

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
      username: "923165",
      password: "f%L0x$N1",
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/user/access/write');
  
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

  ret = await API.run(data, '/app/emr/pharmacy/user/access/delete');

  _print(ret, null);
}

export async function create_dispense(token)
{
  let dispense, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  dispense  = {
    info: {
      instruction: "one per day"
    }
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      mrn: "510226",
      rid: "598096",
      dispense: dispense
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/dispense/write');

  _print(ret, null);

}

export async function read_dispense(token)
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
      did: "210132"
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/dispense/read');

  _print(ret, null);
}

