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
    name: "Yohanes",
    fname: "Adane",
    gfname: "Girma",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/2011",
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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/write');

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
      user_id: "038868"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/read');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/list');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/security/update');

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
      username: "293273",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/access/write');
  
  _print(ret, 'token');

  return ret.status == "ok"?ret.result.token: null;
}

export async function signout(token)
{
  let ret, data;

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/user/access/delete');

  _print(ret, null);
}

export async function create_dispense(token)
{
  let dispense, ret;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  dispense  = {
    info: {
      instruction: "one per day"
    }
  }

  let data = {
    auth: {
      //license: CONFIG.auth.license,
      token: token
    }, 
    param: {
      mrn: "510226",
      rid: "598096",
      dispense: dispense
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/dispense/write');

  _print(ret, null);

}

export async function read_dispense(token)
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
      did: "210132"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/dispense/read');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/invoice/list');

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

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/receipt/list');

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
         type: "drug",
         id: "881842",
         qty: 2
       }]
     }
  }
  
  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/order/write');
  
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
      invoice_id: '2465020031'
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/payment/write');

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
      mrn: "093540"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/account/settlement/write');

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
      mrn: "093540",
      items: [
        {
          type: 'drug',
          id: '881842',
          qty: 1
        }
      ]
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/rufta/pharmacy/items/price/assert');

  _print(ret, null);
}

