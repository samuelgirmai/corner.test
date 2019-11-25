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

export async function create_cashier()
{
  let ret;

  let u = {
    name: "Beriha",
    fname: "Araari",
    mname: "Zimam",
    mfname: "Ayyantu",
    gender: "M",
    dob: "12/12/1999",
    address: {
      region: "Tigray",
      zone: "Mierab",
      woreda: "Sheraro",
      kebele: "02",
      house_number: "13",
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

  ret = await API.run(data, '/app/emr/finance/user/write');

  _print(ret, null);

}

export async function get_cashier()
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

  ret = await API.run(data, '/app/emr/finance/user/read');

  _print(ret, null);
}

export async function list_cashiers()
{
  let ret, data;

  data = {
    auth: {
      license: CONFIG.auth.license
    },
  }

  ret = await API.run(data, '/app/emr/finance/user/list');

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

  ret = await API.run(data, '/app/emr/finance/user/security/update');

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
      username: "256108",
      password: "toor",
    }
  }

  ret = await API.run(data, '/app/emr/finance/user/access/write');

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

  ret = await API.run(data, '/app/emr/finance/user/access/delete');

  _print(ret, null);
}

export async function create_account(token)
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
      mrn: "093540"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/write');

  _print(ret, null);
}

export async function get_account(token)
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
      mrn: "213318"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/read');

  _print(ret, null);
}

export async function set_account_scheme(token)
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
      mrn: "093540",
      scheme_id: "559682928"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/scheme/write');

  _print(ret, null);
}

export async function remove_account(token)
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
      mrn: "213318"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/delete');

  _print(ret, null);
}

export async function create_scheme(token)
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
      name: "woreda",
      desc: "woreda financed health insurance"
    }
  }

  ret = await API.run(data, '/app/emr/finance/insurance/scheme/write');

  _print(ret, null);
}

export async function list_schemes(token)
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
    param: {}
  }

  ret = await API.run(data, '/app/emr/finance/insurance/scheme/list');

  _print(ret, null);
}

export async function remove_schemes(token)
{
  let ret, data;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  data = {
   auth: {
      //license: CONFIG.auth.license,
      token
    },
    param: {
      scheme_id: "xxx"
    }
  }

  ret = await API.run(data, '/app/emr/finance/insurance/scheme/delete');

  _print(ret, null);
}

export async function create_transaction(token)
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
      mrn: "093540",
      transaction: {
        type: "deposit",
        reason: "",
        amount: 3287.01
      }
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/transaction/write');

  _print(ret, null);
}

export async function get_balance(token)
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
      mrn: "093540"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/balance/read');

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
      //license: CONFIG.auth.license,
      token: token
    },
    param: {
      mrn: "213318",
      items: [{
        type: "lab",
        id: "764620",
        name: "wbc",
        qty: 12,
        price: 124.00
      }]
    }
  }

  ret = await API.run(data, '/app/emr/finance/order/write');

  _print(ret, null);
}

export async function get_order(token)
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
      order_id: "0762138137"
    }
  }

  ret = await API.run(data, '/app/emr/finance/order/read');

  _print(ret, null);
}

export async function modify_order(token)
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
      order_id: "0762138137",
      items: [{
        type: "lab",
        id: "lab_id",
        name: "hemoglobin",
        qty: 1,
        price: 125.00
      }]
    }
  }

  ret = await API.run(data, '/app/emr/finance/order/update');

  _print(ret, null);
}

export async function remove_order(token)
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
      order_id: "0762138137"
    }
  }

  ret = await API.run(data, '/app/emr/finance/order/delete');

  _print(ret, null);
}

export async function create_invoice(token)
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
      mrn: "213318",
      order_id: "8129419159"
    }
  }

  ret = await API.run(data, '/app/emr/finance/invoice/write');

  _print(ret, null);
}

export async function get_invoice(token)
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
     invoice_id: "0824095058"
    }
  }

  ret = await API.run(data, '/app/emr/finance/invoice/read');

  _print(ret, null);
}

export async function remove_invoice(token)
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
     invoice_id: "0824095058"
    }
  }

  ret = await API.run(data, '/app/emr/finance/invoice/delete');

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
      //license: CONFIG.auth.license,
      token: token
    },
    param: {}
  }

  ret = await API.run(data, '/app/emr/finance/invoice/list');

  _print(ret, null);
}

export async function create_receipt(token)
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
     invoice_id: "6217092097"
    }
  }

  ret = await API.run(data, '/app/emr/finance/receipt/write');

  _print(ret, null);
}

export async function get_receipt(token)
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
     receipt_id: "0434679429"
    }
  }

  ret = await API.run(data, '/app/emr/finance/receipt/read');

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
      //license: CONFIG.auth.license,
      token: token
    },
    param: {}
  }

  ret = await API.run(data, '/app/emr/finance/receipt/list');

  _print(ret, null);
}

