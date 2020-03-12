import {
  uris2caps
} from '../fcaps'

/*
 * EMR clients SoT
 */
let admin = {
  pii: {
    name: "admin",
    fname: "rufta",
    gfname: "taye",
    mname: "zimam",
    mfname: "berhane",
    gender: "F",
    dob: "12/12/1985",
    address: {
      region: "tigray",
      zone: "mekelle",
      woreda: "hadinet",
      kebele: "16",
      house_number: "213",
      phone_number: "0914198976"
    }
  },
  caps: [
    '/app/rufta/admin/user/write',
    '/app/rufta/admin/user/delete',
    '/app/rufta/admin/user/list',
    '/app/rufta/admin/user/role/write',
    '/app/rufta/admin/user/role/delete',
    '/app/rufta/admin/user/role/read',
    /*FIXME: /app/emr/practner/opd/list shouldn't be here*/
    '/app/rufta/practner/opd/list',
    '/app/rufta/admin/stats/read',
    '/app/rufta/admin/access/write',
    '/app/rufta/admin/access/delete',
    '/app/rufta/admin/security/update',
    '/app/rufta/mru/stats/read',
    '/app/rufta/practner/stats/read',
    '/app/rufta/triage/stats/read'
  ]
}

module.exports = {
  admin: {
    name: "rufta.person.admin",
    pii: admin.pii,
    caps: uris2caps(admin.caps)
  }
}


