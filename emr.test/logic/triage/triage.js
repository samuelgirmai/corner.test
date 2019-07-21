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
    dob: "12/12/12",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      kebele: "11",
      hous_no: "122",
      phone_number: "0955555"
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
      //token: CONFIG.TOKEN   //FIXME token should be used
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "949596"
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
      token: CONFIG.auth.token,
      sec: sec
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/security/write');

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
      user_id: "036895",
      username: "633116",
      password: "65934462",
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
      license: CONFIG.auth.license,
    },
    param: {
      token: CONFIG.auth.token
    }
  }

  ret = await API.run(data, '/app/emr/triage/user/access/delete');

  _print(ret, null);
}

export async function create_assign(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: '253129',
      status: 1,
      assign: {
        catagory: 'BLUE',
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

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      tid: '164022',
      status: 2,
      assign: {
        catagory: 'BLUE',
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

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      tid: '164022',
      status: 2
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/status/update');

  _print(ret, null);
}

export async function read_assign(token)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      tid: '157829'
    }
  }

  ret = await API.run(data, '/app/emr/triage/assign/read');

  _print(ret, null);
}

