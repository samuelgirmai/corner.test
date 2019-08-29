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

export async function create_account(token)
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

  ret = await API.run(data, '/app/emr/finance/account/write');

  _print(ret, null);
}

export async function get_account(token)
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

  ret = await API.run(data, '/app/emr/finance/account/read');

  _print(ret, null);
}

export async function remove_account(token)
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

  ret = await API.run(data, '/app/emr/finance/account/delete');

  _print(ret, null);
}

export async function create_transaction(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839",
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

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839"
    }
  }

  ret = await API.run(data, '/app/emr/finance/account/balance/read');

  _print(ret, null);
}

export async function create_order(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839",
      items: [{
        type: "lab",
        id: "lab_id",
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

  data = {
   auth: {
      license: CONFIG.auth.license,
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

  data = {
   auth: {
      license: CONFIG.auth.license,
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

  data = {
   auth: {
      license: CONFIG.auth.license,
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

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: "532839"
    }
  }

  ret = await API.run(data, '/app/emr/finance/invoice/write');

  _print(ret, null);
}

export async function get_invoice(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
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

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     invoice_id: "0824095058"
    }
  }

  ret = await API.run(data, '/app/emr/finance/invoice/delete');

  _print(ret, null);
}

export async function create_receipt(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     invoice_id: "0824095058"
    }
  }

  ret = await API.run(data, '/app/emr/finance/receipt/write');

  _print(ret, null);
}

export async function get_receipt(token)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     receipt_id: "0434679429"
    }
  }

  ret = await API.run(data, '/app/emr/finance/receipt/read');

  _print(ret, null);
}

