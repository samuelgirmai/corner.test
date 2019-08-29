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
    id: "121212",
    name: "wbc",
    qty: 12,
    price: 124.00
  },
  {
    type: "lab",
    id: "343434",
    name: "hemoglobin",
    qty: 5,
    price: 324.50
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

export async function get_price(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      items: items
    }
  }

  ret = await API.run(data, '/app/emr/payment/items/price/read');

  _print(ret, null);
}

