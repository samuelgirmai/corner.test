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

export async function create_user()
{
  let ret;

  let u = {
    name: "Solomon",
    fname: "Leul",
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
      phone_number: "09111922"
    }
  }

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      pii: u,
      //user_type: 'cofficer'
      //user_type: 'triage'
      user_type: 'practitioner'
      //user_type: 'informatics'
      //user_type: 'labtech'
      //user_type: 'pharmacist'
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/write');

  _print(ret, null);

}

export async function remove_user()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "141714",
      //user_type: "cofficer"
      //user_type: "triage"
      user_type: "practitioner"
      //user_type: "laboratory"
      //user_type: "informatics"
      //user_type: "pharmacist"
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/delete');

  _print(ret, null);
}

export async function list_users()
{
  let ret, data;;

  data = {
    auth: {
      license: CONFIG.auth.license,
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/list');

  _print(ret, null);
}

export async function assign_role()
{
  let ret;
 
  let data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      user_id: "322487",
      //user_type: "cofficer"
      //user_type: "triage"
      user_type: "practitioner"
      //user_type: "laboratory"
      //user_type: "informatics"
       //user_type: "pharmacist"
    }

    }

  ret = await API.run(data, '/app/emr/admin/user/role/write');
  
  _print(ret, 'ret');
}

export async function revoke_role()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "141714",
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/role/delete');

  _print(ret, null);
}
export async function get_role()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "141714",
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/role/read');

  _print(ret, null);
}

export async function get_stats()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    }
  }

  ret = await API.run(data, '/app/emr/admin/stats/read');

  _print(ret, null);
}
   
