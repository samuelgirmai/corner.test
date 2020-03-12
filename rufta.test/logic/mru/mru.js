import API from '../../tools/net';
import CONFIG from './config/config'
import moment from 'moment';

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
    gfname: "Girma",
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/write');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/read');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/list');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/security/update');

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
      username: "453766",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/access/write');
  
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/user/access/delete');

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
    gfname: "Girma",
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/patient/write');

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
      mrn: "352646"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/patient/read');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/patient/appointment/list');

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
        mrn: "352646"
      }
   }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/patient/card/write');

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
      mrn: "352646"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/patient/card/print');

  _print(ret, null);
}

export async function list_unassigned(token)
{
  let data = {
    auth: {
      token: token,
      //license: CONFIG.auth.license,
    },
  }

  //read paid lists
  let r = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/receipt/list');

  if(r.status === 'err'){
    _print(r, null)
    return r;
  }

  //filter Today's receipts
  r = r.result.receipts.filter(item => moment().isSame(moment(item.date*1000), 'day'))
  
  _print(r, null)

  if(!r.length)
    return 0;

  //list assign
  let a = await API.run(data, CONFIG.proxy.url, '/app/rufta/triage/assign/list');

  if(a.status === 'err'){
    _print(a, null)
    return a;
  }
  // filter assigned MRN list
  a = a.result.assign.filter(i => i.status).map(i => i.mrn);

  //>>>> filter paid unassigned MRN
  let unassigned = r.filter(i =>  !r.includes(a)).map(i => i.mrn);

  _print(unassigned, null); //list of paid unassigned MRN. patients info can be fetched from local store!!!
}   
    
export async function list_invoice(token)
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
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/invoice/list');

  _print(ret, null);
}

export async function list_receipt(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let filters = [
    {
      name: "date",
      arg: {
        date: "29/01/2020"
       }
    },
    {
      name: "mrn",
      arg: {
        mrn: "352646",
       }
    }
  ]

  data = {
   auth: {
      token: token,
      //license: CONFIG.auth.license,
    },
    param: {
      //filters: filters
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/receipt/list');

  _print(ret, null);
}

export async function create_order(token)
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
      mrn: "352646",
      items: [
        {
          type: 'card',
          qty: 1
        }
      ]
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/order/write');

  _print(ret, null);
}

export async function create_payment(token)
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
      mrn: "352646",
      invoice_id: '6970012798'
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/payment/write');

  _print(ret, null);
}

export async function settle_account(token)
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
      mrn: "352646"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/account/settlement/write');

  _print(ret, null);
}

export async function assert_payment(token)
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
      mrn: "352646",
      items: [
        {
          type: 'card',
          qty: 1
        }
      ]
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/items/price/assert');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/mru/stats/read');

  _print(ret, null);
}

