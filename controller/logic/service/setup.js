import {
  uris2caps
} from '../fcaps'
/*
 * filesystem SoT
 */
let filesystem = {
  name: "mongnodb",
  port: 27017,
  host: "0.0.0.0"
  //host: "0.0.0.0"
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
    "/platform/auth/heartbeat",
    "/platform/notif/heartbeat",
    "/platform/stream/heartbeat",
    "/app/emr/admin/heartbeat",
    "/app/emr/infotics/heartbeat",
    "/app/emr/notif/heartbeat",
    "/app/emr/pharmacy/heartbeat",
    "/app/emr/store/heartbeat",
    "/app/emr/finance/heartbeat",
    "/app/emr/payment/heartbeat",
    "/app/emr/lab/heartbeat",
    "/app/emr/mru/heartbeat",
    "/app/emr/practner/heartbeat",
    "/app/emr/triage/heartbeat"
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
let corner_notif = {
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
corner_notif.sii.host = corner_notif.api.addr+":"+corner_notif.api.port;

/*
 * EMR services SoT
 */
let mru = {
  sii: {
    name: "emr.mru",
    desc: "EMR medical record unit (MRU) service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26001,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  mrn: {
    start: 300000
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/mru/stats/join",
    "/app/emr/mru/stats/exit",
    "/app/emr/mru/search/join",
    "/app/emr/mru/search/exit",
    "/app/emr/finance/invoice/list",
    "/app/emr/finance/receipt/list",
    "/app/emr/payment/order/write",
    "/app/emr/payment/payment/write",
    "/app/emr/payment/items/price/assert",
    "/app/emr/payment/account/settlement/write"
  ]
}
mru.sii.host = mru.api.addr+":"+mru.api.port;

let triage = {
  sii: {
    name: "emr.triage",
    desc: "EMR triage service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26002,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/app/emr/mru/patient/assert",
    "/app/emr/mru/patient/read",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/triage/stats/join",
    "/app/emr/triage/stats/exit",
    "/app/emr/practner/opd/assert",
    "/app/emr/practner/opd/read",
    "/app/emr/mru/patient/lastVisit/update",
    "/app/emr/notif/write",
    "/app/emr/notif/read",
    "/app/emr/triage/search/join",
    "/app/emr/triage/search/exit"
  ]
}
triage.sii.host = triage.api.addr+":"+triage.api.port;

let practner = {
  sii: {
    name: "emr.practner",
    desc: "EMR practitioner service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26003,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/app/emr/mru/patient/assert",
    "/app/emr/mru/patient/read",
    "/app/emr/infotics/idata/assert",
    "/app/emr/infotics/idata/read",
    "/app/emr/notif/write",
    "/app/emr/notif/read",
    "/app/emr/mru/patient/appointment/update",
  ]
}
practner.sii.host = practner.api.addr+":"+practner.api.port;

let infotics = {
  sii: {
    name: "emr.infotics",
    desc: "EMR informatics service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26004,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
  ]
}
infotics.sii.host = infotics.api.addr+":"+infotics.api.port;

let lab = {
  sii: {
    name: "emr.lab",
    desc: "EMR laboratory service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26005,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/app/emr/mru/patient/assert",
    "/app/emr/practner/patient/record/order/read",
    "/app/emr/notif/write",
    "/app/emr/notif/read",
    "/app/emr/finance/invoice/list",
    "/app/emr/finance/receipt/list",
    "/app/emr/payment/order/write",
    "/app/emr/payment/payment/write",
    "/app/emr/payment/items/price/assert",
    "/app/emr/payment/account/settlement/write"
  ]
}
lab.sii.host = lab.api.addr+":"+lab.api.port;

let pharmacy = {
  sii: {
    name: "emr.pharmacy",
    desc: "EMR pharmacy service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26006,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/app/emr/mru/patient/assert",
    "/app/emr/notif/read",
    "/app/emr/finance/invoice/list",
    "/app/emr/finance/receipt/list",
    "/app/emr/payment/order/write",
    "/app/emr/payment/payment/write",
    "/app/emr/payment/items/price/assert",
    "/app/emr/payment/account/settlement/write"
  ]
}
pharmacy.sii.host = pharmacy.api.addr+":"+pharmacy.api.port;

let finance = {
  sii: {
    name: "emr.finance",
    desc: "EMR finance service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26007,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/app/emr/store/items/price/read",
    "/app/emr/mru/patient/assert"
  ]
}
finance.sii.host = finance.api.addr+":"+finance.api.port;

let payment = {
  sii: {
    name: "emr.payment",
    desc: "EMR payment service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 26008,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    '/app/emr/finance/account/read',
    '/app/emr/store/items/price/read',
    '/app/emr/finance/account/balance/read',
    '/app/emr/finance/order/write',
    '/app/emr/finance/invoice/write',
    '/app/emr/finance/invoice/read',
    '/app/emr/finance/account/transaction/write',
    '/app/emr/finance/receipt/write',
    '/app/emr/finance/insurance/scheme/write'
  ]
}
payment.sii.host = payment.api.addr+":"+payment.api.port;

let admin = {
  sii: {
    name: "emr.admin",
    desc: "EMR administrator service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 27001,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/auth/users/person/write",
    "/platform/auth/users/person/update",
    "/platform/auth/users/person/delete",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/platform/auth/users/person/security/update",
    "/platform/auth/caps/list",
    "/platform/auth/caps/allow",
    "/platform/auth/caps/revoke",
    "/app/emr/mru/user/write",
    "/app/emr/mru/user/read",
    "/app/emr/mru/user/delete",
    "/app/emr/mru/user/update",
    "/app/emr/mru/user/list",
    "/app/emr/practner/user/write",
    "/app/emr/practner/user/read",
    "/app/emr/practner/user/delete",
    "/app/emr/practner/user/update",
    "/app/emr/practner/user/list",
    "/app/emr/practner/opd/list",
    "/app/emr/infotics/user/write",
    "/app/emr/infotics/user/read",
    "/app/emr/infotics/user/list",
    "/app/emr/infotics/user/delete",
    "/app/emr/infotics/user/update",
    "/app/emr/lab/user/write",
    "/app/emr/lab/user/delete",
    "/app/emr/lab/user/update",
    "/app/emr/lab/user/read",
    "/app/emr/lab/user/list",
    "/app/emr/pharmacy/user/write",
    "/app/emr/pharmacy/user/read",
    "/app/emr/pharmacy/user/update",
    "/app/emr/pharmacy/user/delete",
    "/app/emr/pharmacy/user/list",
    "/app/emr/finance/user/delete",
    "/app/emr/finance/user/write",
    "/app/emr/finance/user/read",
    "/app/emr/finance/user/update",
    "/app/emr/finance/user/list",
    "/app/emr/triage/user/update",
    "/app/emr/triage/user/read",
    "/app/emr/triage/user/write",
    "/app/emr/triage/user/delete",
    "/app/emr/triage/user/list"
  ]
}
admin.sii.host = admin.api.addr+":"+admin.api.port;

let emr_notif = {
  sii: {
    name: "emr.notif",
    desc: "EMR notification service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 27002,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/notif/join",
    "/app/emr/notif/exit",
  ]
}
emr_notif.sii.host = emr_notif.api.addr+":"+emr_notif.api.port;

let storeSimulator = {
  sii: {
    name: "emr.storeSimulator",
    desc: "EMR store simulator service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "emr@allena.xyz"
    }
  },
  api: {
    port: 27003,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/app/emr/infotics/idata/read",
  ]
}
storeSimulator.sii.host = storeSimulator.api.addr+":"+storeSimulator.api.port;


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
  corner_notif: {
    name: "corner.notif",
    sii: corner_notif.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: corner_notif.api,
      name: corner_notif.sii.name
    },
    caps: uris2caps(corner_notif.caps)
  },
  mru: {
    name: "emr.mru",
    sii: mru.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: mru.api,
      name: mru.sii.name,
      mrn: mru.mrn
    },
    caps: uris2caps(mru.caps)
  },
  triage: {
    name: "emr.triage",
    sii: triage.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: triage.api,
      name: triage.sii.name
    },
    caps: uris2caps(triage.caps)
  },
  practner: {
    name: "emr.practner",
    sii: practner.sii,
    conf: {
      proxy: proxy,
      api: practner.api,
      name: practner.sii.name
    },
    caps: uris2caps(practner.caps)
  },
  infotics: {
    name: "emr.infotics",
    sii: infotics.sii,
    conf: {
      proxy: proxy,
      api: infotics.api,
      name: infotics.sii.name
    },
    caps: uris2caps(infotics.caps)
  },
  lab: {
    name: "emr.lab",
    sii: lab.sii,
    conf: {
      proxy: proxy,
      api: lab.api,
      name: lab.sii.name
    },
    caps: uris2caps(lab.caps)
  },
  pharmacy: {
    name: "emr.pharmacy",
    sii: pharmacy.sii,
    conf: {
      proxy: proxy,
      api: pharmacy.api,
      name: pharmacy.sii.name
    },
    caps: uris2caps(pharmacy.caps)
  },
  finance: {
    name: "emr.finance",
    sii: finance.sii,
    conf: {
      proxy: proxy,
      api: finance.api,
      name: finance.sii.name
    },
    caps: uris2caps(finance.caps)
  },
  payment: {
    name: "emr.payment",
    sii: payment.sii,
    conf: {
      proxy: proxy,
      api: payment.api,
      name: payment.sii.name
    },
    caps: uris2caps(payment.caps)
  },
  admin: {
    name: "emr.admin",
    sii: admin.sii,
    conf: {
      proxy: proxy,
      api: admin.api,
      name: admin.sii.name
    },
    caps: uris2caps(admin.caps)
  },
  emr_notif: {
    name: "emr.notif",
    sii: emr_notif.sii,
    conf: {
      proxy: proxy,
      api: emr_notif.api,
      stream: stream,
      name: emr_notif.sii.name
    },
    caps: uris2caps(emr_notif.caps)
  },
  storeSimulator: {
    name: "emr.storeSimulator",
    sii: storeSimulator.sii,
    conf: {
      proxy: proxy,
      api: storeSimulator.api,
      name: storeSimulator.sii.name
    },
    caps: uris2caps(storeSimulator.caps)
  }
}


