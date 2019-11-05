let filesystem = {
  name: "mongodb",
  port: 27017,
  host: "0.0.0.0"
}

let muxer = {
  port: 22000,
  bind: "0.0.0.0",
  addr: "0.0.0.0"
}

let proxy = {
  url: "http://"+muxer.addr+":"+muxer.port
}

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
  }
};
auth.sii.host = auth.api.addr+":"+auth.api.port;

let assert = {
  url: "http://"+auth.api.addr+":"+auth.api.port
}

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
  }
}
corner_stream.sii.host = corner_stream.api.addr+":"+corner_stream.api.port;
let stream = {
  url: "http://"+corner_stream.stream.addr+":"+corner_stream.stream.port
}

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
  }
}
corner_notif.sii.host = corner_notif.api.addr+":"+corner_notif.api.port;

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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
}
storeSimulator.sii.host = storeSimulator.api.addr+":"+storeSimulator.api.port;

module.exports = {
  filesystem: {
    name: "corner.fs",
    conf: {
      fs: filesystem
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
    }
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
    }
  },
  corner_notif: {
    name: "corner.notif",
    sii: corner_notif.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: corner_notif.api,
      name: corner_notif.sii.name
    }
  },
  mru: {
    name: "emr.mru",
    sii: mru.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: mru.api,
      name: mru.sii.name
    }
  },
  triage: {
    name: "emr.triage",
    sii: triage.sii,
    conf: {
      proxy: proxy,
      stream: stream,
      api: triage.api,
      name: triage.sii.name
    }
  },
  practner: {
    name: "emr.practner",
    sii: practner.sii,
    conf: {
      proxy: proxy,
      api: practner.api,
      name: practner.sii.name
    }
  },
  infotics: {
    name: "emr.infotics",
    sii: infotics.sii,
    conf: {
      proxy: proxy,
      api: infotics.api,
      name: infotics.sii.name
    }
  },
  lab: {
    name: "emr.lab",
    sii: lab.sii,
    conf: {
      proxy: proxy,
      api: lab.api,
      name: lab.sii.name
    }
  },
  pharmacy: {
    name: "emr.pharmacy",
    sii: pharmacy.sii,
    conf: {
      proxy: proxy,
      api: pharmacy.api,
      name: pharmacy.sii.name
    }
  },
  finance: {
    name: "emr.finance",
    sii: finance.sii,
    conf: {
      proxy: proxy,
      api: finance.api,
      name: finance.sii.name
    }
  },
  payment: {
    name: "emr.payment",
    sii: payment.sii,
    conf: {
      proxy: proxy,
      api: payment.api,
      name: payment.sii.name
    }
  },
  admin: {
    name: "emr.admin",
    sii: admin.sii,
    conf: {
      proxy: proxy,
      api: admin.api,
      name: admin.sii.name
    }
  },
  emr_notif: {
    name: "emr.notif",
    sii: emr_notif.sii,
    conf: {
      proxy: proxy,
      api: emr_notif.api,
      stream: stream,
      name: emr_notif.sii.name
    }
  },
  storeSimulator: {
    name: "emr.storeSimulator",
    sii: storeSimulator.sii,
    conf: {
      proxy: proxy,
      api: storeSimulator.api,
      name: storeSimulator.sii.name
    }
  }
}


