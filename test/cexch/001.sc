import {Test} from '../../core/logic'

import S from '../../module/cexch/snd/main'
import M from '../../module/cexch/mgr/main'
import L from '../../module/cexch/lcp/main'
import T from '../../module/cexch/txv/main'

let scenario = {
  _init: {
    name: "snd_signin",
    cb: S.signin,
    arg: [
      {
        type: "const",
        name: "auth",
        data: {
          username: "496227249",
          password: "toor"
        }
      }
    ],
    nxt: "mgr_signin",
  },
  mgr_signin: {
    name: "mgr_signin",
    cb: M.signin,
    arg: [
      {
        type: "const",
        name: "auth",
        data: {
          username: "373839975",
          password: "toor"
        }
      }
    ],
    nxt: "lcp_signin"
  },
  lcp_signin: {
    name: "lcp_signin",
    cb: L.signin,
    arg: [
      {
        type: "const",
        name: "auth",
        data: {
          username: "712504246",
          password: "toor"
        }
      }
    ],
    nxt: "txv_signin"
  },
  txv_signin: {
    name: "txv_signin",
    cb: T.signin,
    arg: [
      {
        type: "const",
        name: "auth",
        data: {
          username: "736095220",
          password: "toor"
        }
      }
    ],
    nxt: null
  },
  _main: {
    name: "create_transfer",
    cb: S.create_transfer,
    arg: [
      {
        type: "ctx",
        name: "token",
        data: "snd_signin"
      },
      {
        type: "var",
        name: "req",
        data: "req"
      }
    ],
    nxt: "create_transferConfirm"
  },
  create_transferConfirm: {
    name: "create_transferConfirm",
    cb: S.create_transferConfirm,
    arg: [
      {
        type: "ctx",
        name: "token",
        data: "snd_signin"
      },
      {
        type: "ctx",
        name: "req_id",
        data: "create_transfer"
      }
    ],
    nxt: "create_fcDepositeConfirm"
  },
  create_fcDepositeConfirm: {
    name: "create_fcDepositerConfirm",
    cb: S.create_fcDepositeConfirm,
    arg: [
      {
        type: "ctx",
        name: "token",
        data: "snd_signin"
      },
      {
        type: "ctx",
        name: "req_id",
        data: "create_transfer"
      },
      {
        type: "var",
        name: "txid",
        data: "txid"
      }
    ],
    nxt: null
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

