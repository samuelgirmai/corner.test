import {
  uris2caps
} from '../fcaps'

/*
 * CORNER clients SoT
 */
let system = {
  cii: {
    name: "corner.client.system",
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
    name: "corner.client.console",
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
    name: "corner.client.admin",
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

let fsys = {
  cii: {
    name: "corner.client.fsys",
    desc: "corner fsys client",
    address: {
      phone_number: "+251000000019",
      email: "corner@bokri.xyz"
    }
  },
  caps: [
    '/platform/fsys/driver/load',
    '/platform/fsys/driver/unload',
    '/platform/fsys/driver/list/read',
    '/platform/fsys/conn/write',
    '/platform/fsys/conn/delete',
    '/platform/fsys/conn/list/read',
    '/platform/fsys/fs/write',
    '/platform/fsys/fs/delete',
    '/platform/fsys/dir/write',
    '/platform/fsys/dir/delete',
    '/platform/fsys/file/write',
    '/platform/fsys/file/delete',
    '/platform/fsys/index/write',
    '/platform/fsys/index/delete',
    '/platform/fsys/data/write',
    '/platform/fsys/data/read',
    '/platform/fsys/data/update',
    '/platform/fsys/data/delete',
    '/platform/fsys/data/count',
  ]
}

let issuance = {
  cii: {
    name: "corner.client.issuance",
    desc: "corner issuance client",
    address: {
      phone_number: "+251000000018",
      email: "corner@bokri.xyz"
    }
  },
  caps: [
    "/platform/issuance/user/access/write",
  ]
}

module.exports = {
  system: {
    name: "corner.client.system",
    cii: system.cii,
    caps: uris2caps(system.caps)
  },
  /*console: {
    name: "corner.client.console",
    cii: console.cii,
    caps: uris2caps(console.caps)
  },*/
  admin: {
    name: "corner.client.admin",
    cii: admin.cii,
    caps: uris2caps(admin.caps)
  },
  fsys: {
    name: "corner.client.fsys",
    cii: fsys.cii,
    caps: uris2caps(fsys.caps)
  },
  issuance: {
    name: "corner.client.issuance",
    cii: issuance.cii,
    caps: uris2caps(issuance.caps)
  }
}


