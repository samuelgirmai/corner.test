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
      hous_no: "122",
      phone_number: "0916828191"
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

export async function read_user()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: "041489"
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/read');

  _print(ret, null);
}

export async function change_password(token)
{
  let ret;

  let security = {
    username: "805118",
    oldpassword: "y%E6l^E8",
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
      username: "805118",
      password: "j@G3n)O2",
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

export async function create_precord(token)
{
  let rec, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  rec = {
    dialog: {
      chief_complaint: 'non stop headache',
      visit_repeat: false,
      drug: ['111', '222'],
      symptom: 'test symptom',
      remark: 'test remark'
    },
    lab: ['71', '24', '32', '40'],
    ncod: ['25', '51', '10', '21', '23'],
    drug: ['13', '23', '43', '12']
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token,
    }, 
    param: {
      mrn: "596788",
      rec: rec
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
      mrn: "510226",
      rid: "630413"
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

  _print(ret, null);
}

export async function modify_precord(token)
{
  let rec, ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  rec = {
    dialog: {
      visit_repeat: true,
    }
  }

  data = {
   auth: {
      //license: CONFIG.auth.license,
      token: token,
    },
    param: {
      mrn: "510226",
      rid: "630413",
      rec: rec
    }
  }
  
  ret = await API.run(data, '/app/emr/practner/patient/record/update');
  
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
      mrn: "510226",
      rid: "630413"
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


