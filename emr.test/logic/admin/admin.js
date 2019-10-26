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
    dob: "12/12/2002",
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
      pii: u,
      user_type: 'cofficer'
      //user_type: 'triage'
      //user_type: 'practitioner'
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
      user_id: "766266",
      user_type: "cofficer"
      //user_type: "triage"
      //user_type: "practitioner"
      //user_type: "labtech"
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
    },
   param: {
     //user_type: 'cofficer',
     pagin: {page: 1, size: 1, order_type: 'asc'}
   }
  },

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
      user_id: "524676",
      user_type: "cofficer"
      //user_type: "triage"
      //user_type: "practitioner"
      //user_type: "labtech"
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
      user_id: "840146",
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

export async function signin()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: "544860",
      password: "toor",
    }
  }

  ret = await API.run(data, '/app/emr/admin/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
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
   
