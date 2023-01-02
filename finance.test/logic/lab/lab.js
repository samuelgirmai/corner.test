import API from '../../tools/net';
import CONFIG from './config/config'

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
    name: "Jamal",
    fname: "Mohammed",
    gfname: "Girma",
    mname: "Hassan",
    mfname: "Abulrahman",
    gender: "M",
    dob: "12/12/2010",
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/write');

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
      user_id: "498844"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/read');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/list');

  _print(ret, null);
}

export async function change_passwd(token)
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/security/update');

  _print(ret, null);
}

export async function signin()
{
  let data, ret;
 
  data = {
    auth: {
      license: CONFIG.auth.license,
    }, 
    param: {
      username: "352937",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/access/write');
  
  _print(ret, 'token');

  return ret.status == "ok"?ret.result.token:null;
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/user/access/delete');

  _print(ret, null);
}

export async function create_result(token)
{
  let ret, result;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  result = [
    {
      id: '312141',
      result: '200 mg/dL' //FIXME: needs a syntax
    },
    {
      id: '565590',
      result: '13.5 g/dL' //FIXME: needs a syntax
    }
  ]

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      mrn: "617644",
      rid: "407339",
      result: result
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/result/write');

  _print(ret, null);

}

export async function read_result(token)
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
      lid: "971354"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/result/read');

  _print(ret, null);
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/invoice/list');

  _print(ret, null);
}

export async function list_receipt(token)
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/receipt/list');

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
      mrn: '093540',
      items: [
       {
         type: "lab",
         id: "247365",
         qty: 120
       }]
     }
  }
  
  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/order/write');
  
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
      mrn: '093540',
      invoice_id: '4648513860'
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/payment/write');

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
      mrn: '093540',
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/account/settlement/write');

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
      mrn: '093540',
      items: [
       { 
         type: "lab",
         id: "247365",
         qty: 120
       }]
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/lab/items/price/assert');

  _print(ret, null);
}

