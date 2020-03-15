import {
  uris2caps
} from '../fcaps'
/*
 * filesystem SoT
 */
let filesystem = {
  name: "mongodb",
  port: 27017,
  host: "corner.fs"
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
    "/app/rufta/admin/heartbeat",
    "/app/rufta/infotics/heartbeat",
    "/app/rufta/notif/heartbeat",
    "/app/rufta/pharmacy/heartbeat",
    "/app/rufta/store/heartbeat",
    "/app/rufta/finance/heartbeat",
    "/app/rufta/payment/heartbeat",
    "/app/rufta/lab/heartbeat",
    "/app/rufta/mru/heartbeat",
    "/app/rufta/practner/heartbeat",
    "/app/rufta/triage/heartbeat"
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
    name: "rufta.mru",
    desc: "Rufta medical record unit (MRU) service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/stats/join",
    "/app/rufta/mru/stats/exit",
    "/app/rufta/mru/search/join",
    "/app/rufta/mru/search/exit",
    "/app/rufta/finance/invoice/list",
    "/app/rufta/finance/receipt/list",
    "/app/rufta/payment/order/write",
    "/app/rufta/payment/payment/write",
    "/app/rufta/payment/items/price/assert",
    "/app/rufta/payment/account/settlement/write"
  ]
}
mru.sii.host = mru.api.addr+":"+mru.api.port;

let triage = {
  sii: {
    name: "rufta.triage",
    desc: "Rufta triage service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/patient/assert",
    "/app/rufta/mru/patient/read",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/rufta/triage/stats/join",
    "/app/rufta/triage/stats/exit",
    "/app/rufta/practner/opd/assert",
    "/app/rufta/practner/opd/read",
    "/app/rufta/practner/user/read",
    "/app/rufta/mru/patient/lastVisit/update",
    "/app/rufta/notif/write",
    "/app/rufta/notif/read",
    "/app/rufta/triage/search/join",
    "/app/rufta/triage/search/exit"
  ]
}
triage.sii.host = triage.api.addr+":"+triage.api.port;

let practner = {
  sii: {
    name: "rufta.practner",
    desc: "Rufta practitioner service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/patient/assert",
    "/app/rufta/mru/patient/read",
    "/app/rufta/infotics/idata/assert",
    "/app/rufta/infotics/idata/read",
    "/app/rufta/notif/write",
    "/app/rufta/notif/read",
    "/app/rufta/mru/patient/appointment/update",
  ]
}
practner.sii.host = practner.api.addr+":"+practner.api.port;

let infotics = {
  sii: {
    name: "rufta.infotics",
    desc: "Rufta informatics service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    name: "rufta.lab",
    desc: "Rufta laboratory service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/patient/assert",
    "/app/rufta/practner/patient/record/order/read",
    "/app/rufta/notif/write",
    "/app/rufta/notif/read",
    "/app/rufta/finance/invoice/list",
    "/app/rufta/finance/receipt/list",
    "/app/rufta/payment/order/write",
    "/app/rufta/payment/payment/write",
    "/app/rufta/payment/items/price/assert",
    "/app/rufta/payment/account/settlement/write"
  ]
}
lab.sii.host = lab.api.addr+":"+lab.api.port;

let pharmacy = {
  sii: {
    name: "rufta.pharmacy",
    desc: "Rufta pharmacy service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/patient/assert",
    "/app/rufta/notif/read",
    "/app/rufta/finance/invoice/list",
    "/app/rufta/finance/receipt/list",
    "/app/rufta/payment/order/write",
    "/app/rufta/payment/payment/write",
    "/app/rufta/payment/items/price/assert",
    "/app/rufta/payment/account/settlement/write"
  ]
}
pharmacy.sii.host = pharmacy.api.addr+":"+pharmacy.api.port;

let finance = {
  sii: {
    name: "rufta.finance",
    desc: "rufta finance service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/store/items/price/read",
    "/app/rufta/mru/patient/assert"
  ]
}
finance.sii.host = finance.api.addr+":"+finance.api.port;

let payment = {
  sii: {
    name: "rufta.payment",
    desc: "Rufta payment service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
    }
  },
  api: {
    port: 26008,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    '/app/rufta/finance/account/read',
    '/app/rufta/store/items/price/read',
    '/app/rufta/finance/account/balance/read',
    '/app/rufta/finance/order/write',
    '/app/rufta/finance/invoice/write',
    '/app/rufta/finance/invoice/read',
    '/app/rufta/finance/account/transaction/write',
    '/app/rufta/finance/receipt/write',
    '/app/rufta/finance/insurance/scheme/write'
  ]
}
payment.sii.host = payment.api.addr+":"+payment.api.port;

let admin = {
  sii: {
    name: "rufta.admin",
    desc: "Rufta administrator service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/mru/user/write",
    "/app/rufta/mru/user/read",
    "/app/rufta/mru/user/delete",
    "/app/rufta/mru/user/update",
    "/app/rufta/mru/user/list",
    "/app/rufta/practner/user/write",
    "/app/rufta/practner/user/read",
    "/app/rufta/practner/user/delete",
    "/app/rufta/practner/user/update",
    "/app/rufta/practner/user/list",
    "/app/rufta/infotics/user/write",
    "/app/rufta/infotics/user/read",
    "/app/rufta/infotics/user/list",
    "/app/rufta/infotics/user/delete",
    "/app/rufta/infotics/user/update",
    "/app/rufta/lab/user/write",
    "/app/rufta/lab/user/delete",
    "/app/rufta/lab/user/update",
    "/app/rufta/lab/user/read",
    "/app/rufta/lab/user/list",
    "/app/rufta/pharmacy/user/write",
    "/app/rufta/pharmacy/user/read",
    "/app/rufta/pharmacy/user/update",
    "/app/rufta/pharmacy/user/delete",
    "/app/rufta/pharmacy/user/list",
    "/app/rufta/finance/user/delete",
    "/app/rufta/finance/user/write",
    "/app/rufta/finance/user/read",
    "/app/rufta/finance/user/update",
    "/app/rufta/finance/user/list",
    "/app/rufta/triage/user/update",
    "/app/rufta/triage/user/read",
    "/app/rufta/triage/user/write",
    "/app/rufta/triage/user/delete",
    "/app/rufta/triage/user/list"
  ]
}
admin.sii.host = admin.api.addr+":"+admin.api.port;

let emr_notif = {
  sii: {
    name: "rufta.notif",
    desc: "Rufta notification service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
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
    "/app/rufta/notif/join",
    "/app/rufta/notif/exit",
  ]
}
emr_notif.sii.host = emr_notif.api.addr+":"+emr_notif.api.port;

let storeSimulator = {
  sii: {
    name: "rufta.storeSimulator",
    desc: "Rufta store simulator service",
    host: null,
    address: {
      phone_number: "+251000000000",
      email: "rufta@allena.xyz"
    }
  },
  api: {
    port: 27003,
    bind: "0.0.0.0",
    addr: "0.0.0.0",
  },
  caps: [
    "/app/rufta/infotics/idata/read",
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
    name: "rufta.mru",
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
    name: "rufta.triage",
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
    name: "rufta.practner",
    sii: practner.sii,
    conf: {
      proxy: proxy,
      api: practner.api,
      name: practner.sii.name
    },
    caps: uris2caps(practner.caps)
  },
  infotics: {
    name: "rufta.infotics",
    sii: infotics.sii,
    conf: {
      proxy: proxy,
      api: infotics.api,
      name: infotics.sii.name
    },
    caps: uris2caps(infotics.caps)
  },
  lab: {
    name: "rufta.lab",
    sii: lab.sii,
    conf: {
      proxy: proxy,
      api: lab.api,
      name: lab.sii.name
    },
    caps: uris2caps(lab.caps)
  },
  pharmacy: {
    name: "rufta.pharmacy",
    sii: pharmacy.sii,
    conf: {
      proxy: proxy,
      api: pharmacy.api,
      name: pharmacy.sii.name
    },
    caps: uris2caps(pharmacy.caps)
  },
  finance: {
    name: "rufta.finance",
    sii: finance.sii,
    conf: {
      proxy: proxy,
      api: finance.api,
      name: finance.sii.name
    },
    caps: uris2caps(finance.caps)
  },
  payment: {
    name: "rufta.payment",
    sii: payment.sii,
    conf: {
      proxy: proxy,
      api: payment.api,
      name: payment.sii.name
    },
    caps: uris2caps(payment.caps)
  },
  admin: {
    name: "rufta.admin",
    sii: admin.sii,
    conf: {
      proxy: proxy,
      api: admin.api,
      name: admin.sii.name
    },
    caps: uris2caps(admin.caps)
  },
  emr_notif: {
    name: "rufta.notif",
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
    name: "rufta.storeSimulator",
    sii: storeSimulator.sii,
    conf: {
      proxy: proxy,
      api: storeSimulator.api,
      name: storeSimulator.sii.name
    },
    caps: uris2caps(storeSimulator.caps)
  }
}


