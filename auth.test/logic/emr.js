import API from '../api/api_rest';
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

class History {
  symptom = "caugh";
  diagnosis = "mild caugh observed";
  prescription = null;
}

export async function read_history(token)
{
  let data, ret;
 
  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {}
  }

  ret = await API.run(data, '/app/emr/history/read');

  _print(ret, null);
}

export async function write_history(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      history: new History()
    }
  }

  ret = await API.run(data, '/app/emr/history/write');

  _print(ret, null);
}

export async function change_security()
{
  let ret;

  let sec = {
    username: "samuel",
    password: "helloquincy"
  }

  let data = {
    auth: {
      token: CONFIG.TOKEN,
      sec: sec
    }
  }

  ret = await API.run(data, '/platform/auth/users/person/security/write');

  _print(ret, null);
}

export async function signin()
{
  let ret;
 
  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE,
      username: "samuel",
      password: "helloquincy",
    }
  }

  ret = await API.run(data, '/platform/auth/users/access/write');
  
  _print(ret, 'token');
}

export async function signout()
{
  let ret;

  let data = {
    auth: {
      token: CONFIG.TOKEN
    }
  }

  ret = await API.run(data, '/platform/auth/users/access/delete');

  _print(ret, null);
}
