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

export async function create_user()
{
  let ret;

  let u = {
    name: "Kebede",
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
      phone_number: "0901947655"
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

  ret = await API.run(data, '/app/emr/triage/user/write');

  _print(ret, null);
}

export async function read_user(token)
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "497618"
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/read');

  _print(ret, null);
}

export async function change_passwd(token)
{
  let ret;

  let security = {
    username: "798434",
    oldpassword: "d#I9c!O8",
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

  ret = await API.run(data, '/app/emr/triage/user/security/update');

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
      username: "798434",
      password: "j@G3n)O2",
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/access/write');
  
  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token:null
}

export async function signout(token)
{
  let data,ret;

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

  ret = await API.run(data, '/app/emr/triage/user/access/delete');

  _print(ret, null);
}

export async function create_assign(token)
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
      mrn: '618268',
      status: 1,
      assign: {
        catagory: 'Blue',
        dept_id: '133133'
      }
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/write');

  _print(ret, null);
}

export async function update_assign(token)
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
      tid: '875991',
      status: 2,
      assign: {
        catagory: 'Blue',
        dept_id: '133133'
      }
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/update');

  _print(ret, null);
}

export async function update_status(token)
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
      tid: '797193',
      status: 2
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/status/update');

  _print(ret, null);
}

export async function read_assign(token)
{
  let data, ret;

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
      tid: '797193'
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/read');

  _print(ret, null);
}

export async function remove_assign(token)
{
  let data, ret;
  
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
      tid: '875991'
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/delete');

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
      type: "queue_length",
      args: {
        type: "daily",
        date: "11/08/2019"
      }
    }
  }

  ret = await API.run(data, '/app/emr/triage/stats/read');

  _print(ret, null);
}

