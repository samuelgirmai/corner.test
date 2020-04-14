import {
  uris2caps
} from '../fcaps'
/*
 * filesystem SoT
 */
let filesystem = {
  name: "mongodb",
  port: 27017,
  /*host: "corner.fs"
  name: "rethinkdb",
  port: 28015,*/
  host: "0.0.0.0"
}

/*
 * in mempry fs config
 * FIXME: decouple filesystem and cache
*/
let cachefs = {
  name: "redis",
  port: 6379,
  host: "0.0.0.0" /*internal network*/
}

/*
 * muxer SoT
 */
let muxer = {
  port: 22000,
  bind: "0.0.0.0",
  addr: "0.0.0.0"
}

/*
 * auth service SoT
 */
let auth = {
  sii: {
    name: "corner.auth",
    desc: "corner authentication service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  cii: {
    name: "corner.root",
    desc: "corner authentication root client",
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22001,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/notif/heartbeat",
    "/platform/stream/heartbeat",
    "/platform/finance/heartbeat",
    "/platform/payment/heartbeat",
    /*"/app/rufta/admin/heartbeat",
    "/app/rufta/infotics/heartbeat",
    "/app/rufta/notif/heartbeat",
    "/app/rufta/pharmacy/heartbeat",
    "/app/rufta/store/heartbeat",
    "/app/rufta/finance/heartbeat",
    "/app/rufta/payment/heartbeat",
    "/app/rufta/lab/heartbeat",
    "/app/rufta/mru/heartbeat",
    "/app/rufta/practner/heartbeat",
    "/app/rufta/triage/heartbeat"*/
  ]
};
auth.sii.host = auth.api.addr+":"+auth.api.port;

/*
 * streaming service SoT
 */
let corner_stream = {
  sii: {
    name: "corner.stream",
    desc: "corner streaming service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22002,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  stream: {
    driver: "socket-io",
    port: 22003,
    bind: "0.0.0.0",
    addr: "0.0.0.0"
  },
  caps: []
}
corner_stream.sii.host = corner_stream.api.addr+":"+corner_stream.api.port;

/*
 * notif service SoT
 */
let notif = {
  sii: {
    name: "corner.notif",
    desc: "corner notification service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22004,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/stream/open",
    "/platform/stream/close",
    "/platform/notif/join",
    "/platform/notif/exit",
  ]
}
notif.sii.host = notif.api.addr+":"+notif.api.port;

let finance = {
  sii: {
    name: "corner.finance",
    desc: "corner finance service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22005,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/read",
    "/platform/auth/prng/write"
  ]
};
finance.sii.host = finance.api.addr+":"+finance.api.port;

let payment = {
  sii: {
    name: "corner.payment",
    desc: "corner payment service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22006,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    '/platform/finance/account/read',
    '/platform/finance/account/balance/read',
    '/platform/finance/order/write',
    '/platform/finance/invoice/write',
    '/platform/finance/invoice/read',
    '/platform/finance/account/transaction/write',
    '/platform/finance/receipt/write',
    '/platform/finance/insurance/scheme/write'
  ]
};
payment.sii.host = payment.api.addr+":"+payment.api.port;


/*
 * NOTICE: don't put any const here; it is
 * only constructed interms of the data defined
 * above this comment
 */

let proxy = {
  url: "http://"+muxer.addr+":"+muxer.port
}

let assert = {
  url: "http://"+auth.api.addr+":"+auth.api.port
}

let stream = {
  url: "http://"+corner_stream.stream.addr+":"+corner_stream.stream.port
}

module.exports = {
  filesystem: {
    name: "corner.fs",
    conf: {
      fs: filesystem,
      cachefs: cachefs
    }
  },
  muxer: {
    name: "corner.muxer",
    conf: {
      api: muxer,
      assert: assert
    }
  },
  auth: {
    name: "corner.auth",
    sii: auth.sii,
    cii: auth.cii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: auth.api,
      name: auth.sii.name,
    },
    caps: uris2caps(auth.caps)
  },
  stream: {
    name: "corner.stream",
    sii: corner_stream.sii,
    conf: {
      proxy: proxy,
      assert: assert,
      api: corner_stream.api,
      stream: corner_stream.stream,
      name: corner_stream.sii.name
    },
    caps: uris2caps(corner_stream.caps)
  },
  notif: {
    name: "corner.notif",
    sii: notif.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: notif.api,
      name: notif.sii.name
    },
    caps: uris2caps(notif.caps)
  },
  finance: {
    name: "corner.finance",
    sii: finance.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: finance.api,
      name: finance.sii.name
    },
    caps: uris2caps(finance.caps)
  },
  payment: {
    name: "corner.payment",
    sii: payment.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: payment.api,
      name: payment.sii.name
    },
    caps: uris2caps(payment.caps)
  }
}


