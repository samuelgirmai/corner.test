import API from '../../api/api_rest';
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

export async function create_cofficer(token)
{
  let ret;

  let u = {
    name: "Solomon",
    fname: "Leul",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/1999",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "0910333411"
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

  ret = await API.run(data, '/app/emr/mru/user/write');

  _print(ret, null);

}

export async function read_cofficer(token)
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      user_id: "977178"
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
      token: CONFIG.auth.token,
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
      license: CONFIG.auth.license,
    }, 
    param: {
      user_id: "748232",
      username: "290157",
      password: "e^G9s!L5",
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
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "748232",
      token: "876042516422"
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/access/delete');

  _print(ret, null);
}

export async function create_patient(token)
{
  let ret;

  let u = {
    name: "Berhe",
    fname: "Belay",
    mname: "Zimam",
    mfname: "Taye",
    gender: "M",
    dob: "12/12/2012",
    address: {
      region: "Tigray",
      zone: "Mirab",
      woreda: "Humera",
      kebele: "01",
      hous_no: "122",
      phone_number: "0919191361"

    }
  }

  let data = {
    auth: {
      license: CONFIG.auth.license,
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
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "228602"
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/read');

  _print(ret, null);
}

export async function renew_pcard(token)
{
  let ret, data;

  data = {
     auth: {
      license: CONFIG.auth.license,
      },
      param: {
        mrn: "191379"
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
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "191379"
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/card/print');

  _print(ret, null);
}

export async function read_stats(token)
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      type: "cards_status",
      args: {
        type: "all",
      }
    }
  }

  ret = await API.run(data, '/app/emr/mru/stats/read');

  _print(ret, null);
}

