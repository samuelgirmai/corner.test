import DATA from '../../../data/cexch/index'
import {CTX_put, CTX_get} from '../../../core/logic'
import L from './main'

const HANDLER = [
  {
    e_name: "UNLOCKED_init",
    cb: UNLOCKED_init
  },
  {
    e_name: "LC_DEPOSITE_LOCKED_init",
    cb: LC_DEPOSITE_LOCKED_init
  },
  {
    e_name: "LC_DEPOSITED_init",
    cb: LC_DEPOSITED_init
  },
  {
    e_name: "TXID_VERIFIED_init",
    cb: TXID_VERIFIED_init
  },
  {
    e_name: "FRAGMENT_COMPLETE_init",
    cb: FRAGMENT_COMPLETE_init
  },
  {
    e_name: "LC_DEPOSITE_LOCKED_expire",
    cb: LC_DEPOSITE_LOCKED_expire
  }
]

async function UNLOCKED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);

  let arg;

  arg = {
    token: await CTX_get("lcp_signin", "token"),
    req_id: msg.data.req_id,
    frag_id: msg.data.frag_id
  }

  let r = await L.create_lcDepositeLock(arg);
 
  if(r.status == "err") {
    return;
  }

  await CTX_put("UNLOCKED_init", "lock_id", r.result.lock_id);
}

async function LC_DEPOSITE_LOCKED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);

  let arg;

  arg = {
    token: await CTX_get("lcp_signin", "token"),
    lock_id: await CTX_get("UNLOCKED_init", "lock_id"),
    txid: (await DATA.txid())["txid"]
  }

  let r = await L.create_lcDeposite(arg);

  if(r.status == "err") {
    return;
  }
}

function LC_DEPOSITED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function TXID_VERIFIED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function FRAGMENT_COMPLETE_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function LC_DEPOSITE_LOCKED_expire(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

export default HANDLER
