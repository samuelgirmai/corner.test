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
    id: "247365",
    qty: 120
  }]

var invoice_id = "2959825501";

export async function create_order(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "093540",
      items: items
    }
  }

  ret = await API.run(data, '/app/emr/payment/order/write');

  //invoice_id = ret.result.invoice.invoice_id;

  _print(ret, null);
}

export async function create_payment(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "093540",
      invoice_id: invoice_id
    }
  }

  ret = await API.run(data, '/app/emr/payment/payment/write');

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
      mrn: "093540"
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
      mrn: "093540",
      items: items
    }
  }

  ret = await API.run(data, '/app/emr/payment/items/price/assert');

  _print(ret, null);
}

export async function list_drivers(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  ret = await API.run(data, '/app/emr/payment/drivers/list');

  _print(ret, null);
}

