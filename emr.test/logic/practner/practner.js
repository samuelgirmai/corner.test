import API from '../../tools/net';
import STREAM from '../../tools/stream';

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

async function on_dorder(p)
{
  console.log(":::drug order notif:::"+JSON.stringify(p, 0, '  '));

  mark_notif("388784", "delivered");
}

async function on_lorder(p)
{
  console.log(":::lab order notif:::"+JSON.stringify(p, 0, '  '));

  mark_notif("749467", "delivered");
}

export async function mark_notif(nid, mark)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      nid:  nid,
      mark: mark
    }
  }

  ret = await API.run(data, '/app/emr/notif/mark');

  _print(ret, null);
}

export async function subscribe_notification(token)
{
  await STREAM.connect(CONFIG.stream, '/app/emr/notif');

  STREAM.join('/app/emr/notif', {id: CONFIG.auth.license});

  let events = [
    {
      e_name: 'e_lorder',
      cb: on_lorder
    },
    {
      e_name: 'e_dorder',
      cb: on_dorder
    }
  ]

  STREAM.listen("/app/emr/notif", events);
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
    dob: "12/12/1919",
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

  ret = await API.run(data, '/app/emr/practner/user/write');

  _print(ret, null);

}

export async function get_user()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "427042"
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/read');

  _print(ret, null);
}

export async function list_users()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/list');

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

  ret = await API.run(data, '/app/emr/practner/user/security/update');

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
      username: "427042",
      password: "toor",
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/access/write');
  
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

  ret = await API.run(data, '/app/emr/practner/user/access/delete');

  _print(ret, null);
}

export async function create_exam(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let exam = {
    repeat: false, 
    chief_compliant: 'headache',
    allergy: [{id: "261294"}, {id: "720952"}],
   // vitalsign: [{id: "588447"}]
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,

    },
    param: {
      mrn: "601515",
      rid: "051264",
      exam: exam
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/exam/update');

  _print(ret, null);

}

export async function create_order(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }
  
  let order = {
    lab: [{id: "365596"}, {id: "615852"}],
  }
  
  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,

    },
    param: {
      mrn: "601515",
      rid: "539109",
      order: order
    }
  }
  
  ret = await API.run(data, '/app/emr/practner/patient/record/order/update');
  
  _print(ret, null);

}
export async function create_outcome(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }
  
  let outcome = {
    drug: [{id: "831215"}, {id: "152849"}],
    referal: {id: "777279"}
  }
  
  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,

    },
    param: {
      mrn: "517041",
      rid: "539109",
      outcome: outcome
    }
  }
  
  ret = await API.run(data, '/app/emr/practner/patient/record/outcome/update');
  
  _print(ret, null);

}

export async function create_diagnosis(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let diagnosis = {
    ncod: [{id: "594220"}, {id: "572831"}],
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,

    },
    param: {
      mrn: "517041",
      rid: "539109",
      diagnosis: diagnosis
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/diagnosis/update');

  _print(ret, null);

}

export async function create_precord(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,
    }, 
    param: {
      mrn: "517041",
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/write');

  _print(ret, null);

}

export async function read_precord(token)
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
      mrn: "601515",
      rid: "539109"
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

  _print(ret, null);
}

export async function read_outcome(token)
{
  let rec, ret, data;

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
      mrn: "460278",
      rid: "539109",
    }
  }
  
  ret = await API.run(data, '/app/emr/practner/patient/record/outcome/read');
  
  _print(ret, null);
}

export async function read_order(token)
{ 
  let rec, ret, data;
  
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
      mrn: "460278",
      rid: "590477",
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/order/read');

  _print(ret, null);
}

export async function remove_precord(token)
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
      mrn: "460278",
      rid: "590477"
    }
  }
  
  ret = await API.run(data, '/app/emr/practner/patient/record/delete');
  
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
      token: token,
    },
    param: {
      type: "visit_count",
      //type: "drug_count",
      //type: "ncod_count",
      //type: "lab_count"
      args: {
        type: "daily",
        date: "11/08/2019",
        //did: "13"
        //nid: "51"
        //lid: "71"
      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/stats/read');

  _print(ret, null);
}

//////////////////// OPD Test
export async function create_opd(token)
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      dii: {
        catagory: 'test',
        name: 'pediatrics',
        address: {
          phone_number: '0911282828'
        }
      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/opd/write');

  _print(ret, null);
}
export async function get_opd(token)
{
  let ret, data;
  
  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      opd_id: '858908'
    }
  }

  ret = await API.run(data, '/app/emr/practner/opd/read');

  _print(ret, null);
}


