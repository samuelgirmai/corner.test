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

  ret = await API.run(data, '/app/emr/mru/user/write');

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
      user_id: "735043"
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/read');

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

  ret = await API.run(data, '/app/emr/mru/user/security/write');

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
      user_id: "735043",
      username: "245322",
      password: "75565361",
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/access/write');
  
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

  ret = await API.run(data, '/app/emr/mru/user/access/delete');

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

  ret = await API.run(data, '/app/emr/mru/patient/write');

  _print(ret, null);

}

export async function read_patient(token)
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

  ret = await API.run(data, '/app/emr/mru/patient/read');

  _print(ret, null);
}

export async function issue_pcard(token)
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

  ret = await API.run(data, '/app/emr/mru/patient/card/write');

  _print(ret, null);
}

export async function print_pcard(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.C_LICENSE,
    },
    param: {
      card_id: "412960"
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/card/print');

  _print(ret, null);
}



