import API from '../../api/api_rest';
import CONFIG from '../../config/config'

export async function create_account(arg)
{
  let ret, data;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.mrn
    }
  }

  ret = await API.run(data, '/app/rufta/finance/account/write');
console.log(ret)
  return ret.status == "ok"?arg.mrn:null
}

export async function get_account(arg)
{
  let ret, data;

  data = {
   auth: {
      license: arg.license
    },
    param: {
      mrn: arg.mrn
    }
  }

  ret = await API.run(data, '/app/rufta/finance/account/read');

  return ret.status == "ok"?ret.result.account: null
}

export async function create_transaction(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.mrn,
      transaction: {
        type: "deposit",
        reason: "",
        amount: arg.amount
      }
    }
  }

  ret = await API.run(data, '/app/rufta/finance/account/transaction/write');

  return ret.status == "ok"?arg.mrn: null
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

  ret = await API.run(data, '/app/rufta/finance/account/balance/read');

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

  ret = await API.run(data, '/app/rufta/finance/order/write');

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

  ret = await API.run(data, '/app/rufta/finance/order/read');

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

  ret = await API.run(data, '/app/rufta/finance/order/update');

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

  ret = await API.run(data, '/app/rufta/finance/order/delete');

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

  ret = await API.run(data, '/app/rufta/finance/invoice/write');

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

  ret = await API.run(data, '/app/rufta/finance/invoice/read');

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

  ret = await API.run(data, '/app/rufta/finance/invoice/delete');

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

  ret = await API.run(data, '/app/rufta/finance/receipt/write');

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

  ret = await API.run(data, '/app/rufta/finance/receipt/read');

  _print(ret, null);
}
const FIN = {
  create_account:    create_account,
  get_account:    get_account
  /*
   * TO DO
   */
}
export default FIN;

