import DATA from '../../../data/cexch/index'
import {CTX_put, CTX_get} from '../../../core/logic'
import T from './main'

const HANDLER = [
  {
    e_name: "LC_DEPOSITED_init",
    cb: LC_DEPOSITED_init
  },
  {
    e_name: "TXID_INFO_LOCKED_init",
    cb: TXID_INFO_LOCKED_init
  },
  {
    e_name: "FRAGMENT_COMPLETE_init",
    cb: FRAGMENT_COMPLETE_init
  },
  {
    e_name: "TXID_INFO_LOCKED_expire",
    cb: TXID_INFO_LOCKED_expire
  }
]

function LC_DEPOSITED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);

  let arg;

  arg = {
    token: await CTX_get("txv_signin", "token"),
    lcDeposite_id: msg.data.lcDeposite_id
  }

  let r = await L.create_txidInfoLock(arg);

  if(r.status == "err") {
    return;
  }

  await CTX_put("LC_DEPOSITED_init", "lock_id", r.result.lock_id);
}

function TXID_INFO_LOCKED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function FRAGMENT_COMPLETE_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function TXID_INFO_LOCKED_expire(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

export default HANDLER
