import {
  uris2caps
} from '../fcaps'
/*
 * filesystem SoT
 */
let filesystem = {
  name: "mongodb",
  port: 27017,
  host: "0.0.0.0"
  /*name: "rethinkdb",
  port: 28015,
  host: "0.0.0.0"*/
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
    "/platform/system/heartbeat",
    "/platform/admin/heartbeat",
     //
    "/platform/stream/open",
    "/platform/stream/close",
    "/platform/stream/config/read",
    "/platform/auth/search/join",
    "/platform/auth/search/exit"
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
    "/platform/stream/config/read",
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
    "/platform/auth/identity/person/read",
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

let admin = {
  sii: {
    name: "corner.admin",
    desc: "corner admin service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22007,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    '/platform/auth/identity/access/write',
    '/platform/auth/identity/access/delete',
    '/platform/auth/identity/person/security/update',
    '/platform/auth/caps/allow',
    '/platform/auth/caps/revoke',
    '/platform/system/user/write',
    '/platform/system/user/delete',
    '/platform/system/user/list',
    '/platform/auth/identity/person/write',

    /*'/platform/console/user/write',
    '/platform/console/user/delete',
    '/platform/console/user/list',*/
  ]
};
admin.sii.host = admin.api.addr+":"+admin.api.port;

let system = {
  sii: {
    name: "corner.system",
    desc: "corner sys service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22008,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/identity/access/write",
    "/platform/auth/identity/access/delete",
    "/platform/auth/identity/person/security/update",

    '/platform/auth/identity/person/write',
    '/platform/auth/identity/person/delete',
    '/platform/auth/identity/persons/list',
    '/platform/auth/identity/client/write',
    '/platform/auth/identity/client/delete',
    '/platform/auth/identity/clients/list',
    '/platform/auth/identity/service/write',
    '/platform/auth/identity/service/delete',
    '/platform/auth/identity/services/list',
    '/platform/auth/caps/list',
    '/platform/auth/caps/delete',
    '/platform/auth/caps/allow',
    '/platform/auth/caps/revoke',
    '/platform/auth/caps/export',
    '/platform/auth/cap/state/update',
    '/platform/auth/stats/read',
    '/platform/auth/identity/services/state/read'
  ]
};
system.sii.host = system.api.addr+":"+system.api.port;

let math = {
  sii: {
    name: "corner.math",
    desc: "corner math service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "corner@bokri.xyz"
    }
  },
  api: {
    port: 22009,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    '/platform/math/add',
    '/platform/math/mul',

  ]
};
math.sii.host = math.api.addr+":"+math.api.port;

/*
 * NOTICE: don't put any const here; it is
 * only constructed interms of the data defined
 * above this comment
 */

let proxy = {
  url: "https://"+muxer.addr+":"+muxer.port
}

let assert = {
  url: "http://"+auth.api.addr+":"+auth.api.port
}

let stream = {
  url: "https://"+corner_stream.stream.addr+":"+corner_stream.stream.port
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
  },
  admin: {
    name: "corner.admin",
    sii: admin.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: admin.api,
      name: admin.sii.name
    },
    caps: uris2caps(admin.caps)
  },
  system: {
    name: "corner.system",
    sii: system.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: system.api,
      name: system.sii.name
    },
    caps: uris2caps(system.caps)
  },
  math: {
    name: "corner.math",
    sii: math.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: math.api,
      name: math.sii.name
    },
    caps: uris2caps(math.caps)
  },
}

