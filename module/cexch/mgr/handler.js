import DATA from '../../../data/cexch/index'
import {CTX_put, CTX_get} from '../../../core/logic'
import M from './main'

const HANDLER = [
  {
    e_name: "FC_DEPOSITE_CONFIRMED_init",
    cb: FC_DEPOSITE_CONFIRMED_init
  },
  {
    e_name: "FC_DEPOSITE_CONFIRMED_expire",
    cb: FC_DEPOSITE_CONFIRMED_expire
  }
]

async function FC_DEPOSITE_CONFIRMED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);

  let arg;

  arg = {
    token: await CTX_get("mgr_signin", "token"),
    fcDeposite_id: msg.data.fcDeposite_id
  }

  await M.create_fcDepositeComplete(arg);

  arg = {
    token: await CTX_get("mgr_signin", "token"),
    req_id: await CTX_get("create_transfer", "req_id"),
    frag_cnt: (await DATA.frag_cnt())["frag_cnt"]
  }

  await M.create_fragment(arg);
}

async function FC_DEPOSITE_CONFIRMED_expire(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

export default HANDLER
