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

export async function create_cofficer()
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

  ret = await API.run(data, '/app/emr/mru/user/write');

  _print(ret, null);

}

export async function get_cofficer()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      user_id: "172172"
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/read');

  _print(ret, null);
}

export async function list_cofficers()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license
    },
  }

  ret = await API.run(data, '/app/emr/mru/user/list');

  _print(ret, null);
}


export async function change_password(token)
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
      username: "640142",
      oldpassword: "toor",
      newpassword: "j@G3n)O2"
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/security/update');

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
      username: "022342",
      password: "toor",
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/access/write');
  
  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
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

  ret = await API.run(data, '/app/emr/mru/user/access/delete');

  _print(ret, null);
}

export async function create_patient(token)
{
  let ret, u;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  u = {
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
      house_number: "122",
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,
    }, 
    param: {
      pii: u
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/write');

  _print(ret, null);

}

export async function read_patient(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
   auth: {
      //license: CONFIG.auth.license,
      token: token,
    },
    param: {
      mrn: "336163"
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/read');

  _print(ret, null);
}

export async function list_appointments(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
   auth: {
      //license: CONFIG.auth.license,
      token: token,
    },
    param: {
      appointment: {
        date: "30/10/2019"
      }
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/appointment/list');

  _print(ret, null);
}

export async function renew_pcard(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }
  data = {
     auth: {
      //license: CONFIG.auth.license,
      token: token,
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

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
   auth: {
      token: token,
      //license: CONFIG.auth.license,
    },
    param: {
      mrn: "510226"
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/card/print');

  _print(ret, null);
}

export async function read_stats(token)
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
      type: "cards_status",
      args: {
        type: "all",
      }
    }
  }

  ret = await API.run(data, '/app/emr/mru/stats/read');

  _print(ret, null);
}

