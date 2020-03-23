import API from '../../tools/net';
import CONFIG from '../config/config'

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

var user_id = '';

var items = [
  {
    type: "lab",
    id: "247365",
    qty: 120
  }]

var invoice_id = "2959825501";

export async function create_order()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "093540",
      items: items
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/payment/order/write');

  if(ret.status == 'ok')
    invoice_id = ret.result.invoice.invoice_id;

  _print(ret, null);
}

export async function create_payment()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "093540",
      invoice_id: invoice_id
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/payment/payment/write');

  _print(ret, null);
}

export async function settle_account()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "093540"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/payment/account/settlement/write');

  _print(ret, null);
}

export async function assert_payment()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "093540",
      items: items
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/payment/items/price/assert');

  _print(ret, null);
}

export async function list_drivers()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/payment/drivers/list');

  _print(ret, null);
}

