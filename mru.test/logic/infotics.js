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

export async function create_user()
{
  let ret;

  let u = {
    name: "Abebe",
    fname: "Adane",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/12",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "095886"
    }
  }

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
    }, 
    param: {
      pii: u
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/write');

  _print(ret, null);

}

export async function read_user(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      user_id: "467505"
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/read');

  _print(ret, null);
}

export async function change_security()
{
  let ret;

  let sec = {
    username: "083403",
    password: "12264627"
  }

  let data = {
    auth: {
      token: CONFIG.TOKEN,
      sec: sec
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/security/write');

  _print(ret, null);
}

export async function signin()
{
  let ret;
 
  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
    }, 
    param: {
      user_id: "649304",
      username: "822794",
      password: "08587278",
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/access/write');
  
  _print(ret, 'token');
}

export async function signout(token)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
    },
    param: {
      token: CONFIG.TOKEN
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/access/delete');

  _print(ret, null);
}

export async function create_idata(token)
{
  let ret;

  let u = {
    name: "Nati",
    fname: "Solomon",
    mname: "Abeba",
    mfname: "Haile",
    gender: "M",
    dob: "12/12/12",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "09191388"
    }
  }

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
    }, 
    param: {
      token: token,
      pii: u
    }
  }

  ret = await API.run(data, '/app/emr/infotics/idata/write');

  _print(ret, null);

}

export async function read_idata(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.C_LICENSE,
    },
    param: {
      user_id: "412960"
    }
  }

  ret = await API.run(data, '/app/emr/infotics/idata//read');

  _print(ret, null);
}

