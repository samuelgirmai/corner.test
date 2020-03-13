import {
  uris2caps
} from '../fcaps'

/*
 * EMR clients SoT
 */
let mru = {
  cii: {
    name: "rufta.mru",
    desc: "Rufta medical record unit (MRU) client",
    address: {
      phone_number: "+251000000010",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/mru/user/access/write",
    "/app/rufta/mru/search/join",
    "/app/rufta/mru/search/exit",
  ]
}

let triage = {
  cii: {
    name: "rufta.triage",
    desc: "Rufta triage client",
    address: {
      phone_number: "+251000000011",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/triage/user/access/write"
  ]
}

let practner = {
  cii: {
    name: "rufta.practner",
    desc: "Rufta practitioner client",
    address: {
      phone_number: "+251000000012",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/practner/user/access/write",
    "/app/rufta/notif/join",
    "/app/rufta/notif/exit"
  ]
}

let infotics = {
  cii: {
    name: "rufta.infotics",
    desc: "Rufta informatics client",
    address: {
      phone_number: "+251000000013",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/infotics/user/access/write"
  ]
}

let lab = {
  cii: {
    name: "rufta.lab",
    desc: "rufta laboratory client",
    address: {
      phone_number: "+251000000014",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/lab/user/access/write",
    "/app/rufta/notif/join",
    "/app/rufta/notif/exit"
  ]
}

let pharmacy = {
  cii: {
    name: "rufta.pharmacy",
    desc: "rufta pharmacy client",
    address: {
      phone_number: "+251000000015",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/pharmacy/user/access/write",
    "/app/rufta/notif/join",
    "/app/rufta/notif/exit"
  ]
}

let cashier = {
  cii: {
    name: "rufta.cashier",
    desc: "Rufta cashier client",
    address: {
      phone_number: "+251000000016",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/finance/user/access/write"
  ]
}

let admin = {
  cii: {
    name: "rufta.admin",
    desc: "Rufta administrator client",
    address: {
      phone_number: "+251000000017",
      email: "rufta@allena.xyz"
    }
  },
  caps: [
    "/app/rufta/admin/access/write"
  ]
}

module.exports = {
  mru: {
    name: "rufta.mru",
    cii: mru.cii,
    caps: uris2caps(mru.caps)
  },
  triage: {
    name: "rufta.triage",
    cii: triage.cii,
    caps: uris2caps(triage.caps)
  },
  practner: {
    name: "rufta.practner",
    cii: practner.cii,
    caps: uris2caps(practner.caps)
  },
  infotics: {
    name: "rufta.infotics",
    cii: infotics.cii,
    caps: uris2caps(infotics.caps)
  },
  lab: {
    name: "rufta.lab",
    cii: lab.cii,
    caps: uris2caps(lab.caps)
  },
  pharmacy: {
    name: "rufta.pharmacy",
    cii: pharmacy.cii,
    caps: uris2caps(pharmacy.caps)
  },
  cashier: {
    name: "rufta.cashier",
    cii: cashier.cii,
    caps: uris2caps(cashier.caps)
  },
  admin: {
    name: "rufta.admin",
    cii: admin.cii,
    caps: uris2caps(admin.caps)
  },
}


