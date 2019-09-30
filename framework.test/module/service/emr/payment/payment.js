import API from '../../api/api_rest';
import CONFIG from '../../config/config'

export async function create_payment(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.result.mrn,
      items: arg.result.items
    }
  }

console.log(arg, arg.result.items)

  ret = await API.run(data, '/app/emr/payment/write');

console.log(ret);
  return (ret.status === 'ok')? ret.result.receipt: null
}

export async function settle_account(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.result.mrn
    }
  }

  ret = await API.run(data, '/app/emr/payment/account/settlement/write');

  return (ret.status === 'ok')? arg.result: null
}

export async function assert_payment(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.mrn,
      items: arg.items
    }
  }

  ret = await API.run(data, '/app/emr/payment/items/price/balance/assert');

  return (ret.status === 'ok')? ret.result: null
}

const PAY = {
  create_payment:    create_payment,
  assert_payment:    assert_payment,
  settle_account:    settle_account,
}
export default PAY;


