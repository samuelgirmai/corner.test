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
      phone_number: "093333334"
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

  ret = await API.run(data, '/app/emr/infotics/user/write');

  _print(ret, null);
}

export async function read_user(token)
{
  let ret, data;

  data = {
    auth: {
      //token: CONFIG.TOKEN		//FIXME: use token
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "750133"
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/read');

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

  ret = await API.run(data, '/app/emr/infotics/user/security/write');

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
      user_id: "750133",
      username: "616005",
      password: "95650100",
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/access/write');
  
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
      user_id: "750133",
      token: CONFIG.auth.token
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/access/delete');

  _print(ret, null);
}

export async function create_idata(token)
{
  let ret;

  let drug = {
    name: 'paracetamol'
  }

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      type: 'drug',
      data: drug
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
      license: CONFIG.auth.license,
    },
    param: {
      type: 'drug',
      iid: "975715"
    }
  }

  ret = await API.run(data, '/app/emr/infotics/idata/read');

  _print(ret, null);
}
