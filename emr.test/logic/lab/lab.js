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
    name: "Jamal",
    fname: "Mohammed",
    mname: "Hassan",
    mfname: "Abulrahman",
    gender: "M",
    dob: "12/12/2010",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "0911898977"
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

  ret = await API.run(data, '/app/emr/lab/user/write');

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
      user_id: "498844"
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/read');

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

  ret = await API.run(data, '/app/emr/lab/user/list');

  _print(ret, null);
}

export async function change_passwd(token)
{
  let ret;

  let security = {
    username: "021362",
    oldpassword: "t#M4o^K2",
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

  ret = await API.run(data, '/app/emr/lab/user/security/update');

  _print(ret, null);
}

export async function signin()
{
  let data, ret;
 
  data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      username: "021362",
      password: "t#M4o^K2",
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/access/write');
  
  _print(ret, 'token');

  return ret.status == "ok"?ret.result.token:null;
}

export async function signout(token)
{
  let data, ret;

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

  ret = await API.run(data, '/app/emr/lab/user/access/delete');

  _print(ret, null);
}

export async function create_result(token)
{
  let ret, result;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  result = {
    order: {
      catagory: 'default',
      type: {}
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
      result: result
    }
  }

  ret = await API.run(data, '/app/emr/lab/result/write');

  _print(ret, null);

}

export async function read_result(token)
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
      lid: "971354"
    }
  }

  ret = await API.run(data, '/app/emr/lab/result/read');

  _print(ret, null);
}
