import {
  uris2caps
} from '../fcaps'

/*
 * CORNER clients SoT
 */
let system = {
  cii: {
    name: "corner.system",
    desc: "corner sys client",
    address: {
      phone_number: "+251000000010",
      email: "corner@bokri.xyz"
    }
  },
  caps: [
    "/platform/system/user/access/write",
  ]
}

/*let console = {
  cii: {
    name: "corner.console",
    desc: "corner console client",
    address: {
      phone_number: "+251000000015",
      email: "corner@bokri.xyz"
    }
  },
  caps: [
    "/platform/console/user/access/write",
  ]
}*/

let admin = {
  cii: {
    name: "corner.admin",
    desc: "Corner administrator client",
    address: {
      phone_number: "+251000000017",
      email: "corner@bokri.xyz"
    }
  },
  caps: [
    "/platform/admin/access/write"
  ]
}

module.exports = {
  system: {
    name: "corner.system",
    cii: system.cii,
    caps: uris2caps(system.caps)
  },
  /*console: {
    name: "corner.console",
    cii: console.cii,
    caps: uris2caps(console.caps)
  },*/
  admin: {
    name: "corner.admin",
    cii: admin.cii,
    caps: uris2caps(admin.caps)
  },
}


