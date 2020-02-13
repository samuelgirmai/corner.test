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
    '/app/emr/admin/user/write',
    '/app/emr/admin/user/delete',
    '/app/emr/admin/user/list',
    '/app/emr/admin/user/role/write',
    '/app/emr/admin/user/role/delete',
    '/app/emr/admin/user/role/read',
    /*FIXME: /app/emr/practner/opd/list shouldn't be here*/
    '/app/emr/practner/opd/list',
    '/app/emr/admin/stats/read',
    '/app/emr/admin/access/write',
    '/app/emr/admin/access/delete',
    '/app/emr/admin/security/update'
  ]
}

module.exports = {
  admin: {
    name: "emr.person.admin",
    pii: admin.pii,
    caps: uris2caps(admin.caps)
  }
}


