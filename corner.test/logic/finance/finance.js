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


var user_id = '431303';

export async function create_account()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      /*type: 'ACCOUNT_CORNER'*/
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/write');

  _print(ret, null);
}

export async function get_account()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      account_id: "8361080617336",
	     
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/read');

  _print(ret, null);
}

export async function set_account_scheme()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      scheme_id: "559682928"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/scheme/write');

  _print(ret, null);
}

export async function remove_account()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      account_id: "8361080617336"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/delete');

  _print(ret, null);
}

export async function create_scheme()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      name: "woreda",
      desc: "woreda financed health insurance"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/insurance/scheme/write');

  _print(ret, null);
}

export async function list_schemes()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/insurance/scheme/list');

  _print(ret, null);
}

export async function remove_schemes()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      scheme_id: "219822"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/insurance/scheme/delete');

  _print(ret, null);
}

export async function create_transaction()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      transaction: {
        type: "deposit",
        reason: "",
        amount: 3287.01
      }
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/transaction/write');

  _print(ret, null);
}

export async function create_deposit()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      transaction: {
        reason: "",
        amount: 3287.01
      }
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/transaction/deposit/write');

  _print(ret, null);
}

export async function create_withdraw()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      transaction: {
        reason: "",
        amount: 320.01
      }
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/transaction/withdraw/write');

  _print(ret, null);
}

export async function get_balance()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      account_id: "8361080617336"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/account/balance/read');

  _print(ret, null);
}

export async function create_order()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      items: [{
        type: "lab",
        id: "764620",
        name: "wbc",
        qty: 12,
        price: 124.00
      }]
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/order/write');

  _print(ret, null);
}

export async function get_order()
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

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/order/read');

  _print(ret, null);
}

export async function modify_order()
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

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/order/update');

  _print(ret, null);
}

export async function remove_order()
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

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/order/delete');

  _print(ret, null);
}

export async function create_invoice()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: user_id,
      account_id: "8361080617336",
      order_id: "6981822346",
      service_type: "mru"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/invoice/write');

  _print(ret, null);
}

export async function get_invoice()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     invoice_id: "6436230277"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/invoice/read');

  _print(ret, null);
}

export async function remove_invoice()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     invoice_id: "4296329083"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/invoice/delete');

  _print(ret, null);
}

export async function list_invoice()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/invoice/list');

  _print(ret, null);
}

export async function create_receipt()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     invoice_id: "6436230277"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/receipt/write');

  _print(ret, null);
}

export async function get_receipt()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
     receipt_id: "3733323113"
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/receipt/read');

  _print(ret, null);
}

export async function list_receipt()
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/finance/receipt/list');

  _print(ret, null);
}
