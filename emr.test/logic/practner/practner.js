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

export async function create_user(token)
{
  let ret;

  let u = {
    name: "Yohanes",
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
      phone_number: "09111123"
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

  ret = await API.run(data, '/app/emr/practner/user/write');

  _print(ret, null);

}

export async function read_user(token)
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
      //token: CONFIG.TOKEN  //FIXME use token
    },
    param: {
      user_id: "695649"
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/read');

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

  ret = await API.run(data, '/app/emr/practner/user/security/write');

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
      user_id: "695649",
      username: "245322",
      password: "75565361",
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/access/write');
  
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

  ret = await API.run(data, '/app/emr/practner/user/access/delete');

  _print(ret, null);
}

export async function create_precord(token)
{
  let ret;

  let rec = {
    dialog: {
      chief_complaint: 'test',
      visit_repeat: 'false',
      medication: 'test',
      symptom: 'test',
      remark: 'test'
    }
  }

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      mrn: "327652",
      rec: rec
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/write');

  _print(ret, null);

}

export async function read_precord(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "327652",
      rid: "542325"
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

  _print(ret, null);
}
