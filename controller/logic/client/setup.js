import {
  uris2caps
} from '../fcaps'

/*
 * EMR clients SoT
 */
let mru = {
  cii: {
    name: "emr.mru",
    desc: "EMR medical record unit (MRU) client",
    address: {
      phone_number: "+251000000010",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/mru/user/access/write"
  ]
}

let triage = {
  cii: {
    name: "emr.triage",
    desc: "EMR triage client",
    address: {
      phone_number: "+251000000011",
      email: "emr@allena.xyz"
    }
  },
  caps: [
  ]
}

let practner = {
  cii: {
    name: "emr.practner",
    desc: "EMR practitioner client",
    address: {
      phone_number: "+251000000012",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/practner/user/access/write"
  ]
}

let infotics = {
  cii: {
    name: "emr.infotics",
    desc: "EMR informatics client",
    address: {
      phone_number: "+251000000013",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/infotics/user/access/write"
  ]
}

let lab = {
  cii: {
    name: "emr.lab",
    desc: "EMR laboratory client",
    address: {
      phone_number: "+251000000014",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/lab/user/access/write"
  ]
}

let pharmacy = {
  cii: {
    name: "emr.pharmacy",
    desc: "EMR pharmacy client",
    address: {
      phone_number: "+251000000015",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/pharmacy/user/access/write"
  ]
}

let cashier = {
  cii: {
    name: "emr.cashier",
    desc: "EMR cashier client",
    address: {
      phone_number: "+251000000016",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/finance/user/access/write"
  ]
}

let admin = {
  cii: {
    name: "emr.admin",
    desc: "EMR administrator client",
    address: {
      phone_number: "+251000000017",
      email: "emr@allena.xyz"
    }
  },
  caps: [
    "/app/emr/admin/access/write"
  ]
}

module.exports = {
  mru: {
    name: "emr.mru",
    cii: mru.cii,
    caps: uris2caps(mru.caps)
  },
  triage: {
    name: "emr.triage",
    cii: triage.cii,
    caps: uris2caps(triage.caps)
  },
  practner: {
    name: "emr.practner",
    cii: practner.cii,
    caps: uris2caps(practner.caps)
  },
  infotics: {
    name: "emr.infotics",
    cii: infotics.cii,
    caps: uris2caps(infotics.caps)
  },
  lab: {
    name: "emr.lab",
    cii: lab.cii,
    caps: uris2caps(lab.caps)
  },
  pharmacy: {
    name: "emr.pharmacy",
    cii: pharmacy.cii,
    caps: uris2caps(pharmacy.caps)
  },
  cashier: {
    name: "emr.cashier",
    cii: cashier.cii,
    caps: uris2caps(cashier.caps)
  },
  admin: {
    name: "emr.admin",
    cii: admin.cii,
    caps: uris2caps(admin.caps)
  },
}


