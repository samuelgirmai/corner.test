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
      user_id: "759572"
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/read');

  _print(ret, null);
}

export async function change_security()
{
  let ret;

  let sec = {
    username: "607479",
    password: "39262394"
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
      user_id: "759572",
      username: "607479",
      password: "39262394",
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
      user_id: "759572",
      token: token
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
      rid: "299208"
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

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
      type: "visit_count",
      //type: "drug_count",
      //type: "ncod_count",
      args: {
        type: "monthly",
        date: "07/2019",
        //did: "72553"
        //nid: "1234"
        //lid: "2114"

      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/stats/read');

  _print(ret, null);
}
    
