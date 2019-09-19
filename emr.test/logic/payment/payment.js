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

var items = [
  {
    type: "lab",
    id: "719803",
    qty: 12
  },
  {
    type: "lab",
    id: "654199",
    qty: 4
  }]

export async function create_payment(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839",
      items: items
    }
  }

  ret = await API.run(data, '/app/emr/payment/write');

  _print(ret, null);
}

export async function settle_account(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839"
    }
  }

  ret = await API.run(data, '/app/emr/payment/account/settlement/write');

  _print(ret, null);
}

export async function assert_payment(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839",
      items: items
    }
  }

  ret = await API.run(data, '/app/emr/payment/items/price/balance/assert');

  _print(ret, null);
}

