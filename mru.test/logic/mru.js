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

export async function create_cofficer(token)
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

  ret = await API.run(data, '/app/emr/cofficer/write');

  _print(ret, null);

}

export async function read_cofficer(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      person_id: "774533"
    }
  }

  ret = await API.run(data, '/app/emr/cofficer/read');

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

  ret = await API.run(data, '/platform/auth/users/person/security/write');

  _print(ret, null);
}

export async function signin()
{
  let ret;
 
  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      username: "642556",
      password: "31854092"
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

export async function create_patient(token)
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
      phone_number: "0959"
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

  ret = await API.run(data, '/app/emr/patient/write');

  _print(ret, null);

}

export async function read_patient(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      person_id: "049045"
    }
  }

  ret = await API.run(data, '/app/emr/patient/read');

  _print(ret, null);
}

export async function issue_pcard(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      person_id: "049045"
    }
  }

  ret = await API.run(data, '/app/emr/patient/card/write');

  _print(ret, null);
}

export async function print_pcard(token)
{
  let ret, data;

  data = {
    auth: {
      token: CONFIG.TOKEN
    },
    param: {
      card_id: "556520"
    }
  }

  ret = await API.run(data, '/app/emr/patient/card/read');

  _print(ret, null);
}



