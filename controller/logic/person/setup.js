import {
  uris2caps
} from '../fcaps'

/*
 * EMR clients SoT
 */
let admin = {
  pii: {
    name: "Silas",
    fname: "Berhane",
    mname: "Zimam",
    mfname: "Berhane",
    gender: "F",
    dob: "12/12/1995",
    address: {
      region: "Tigray",
      zone: "Mekelle",
      woreda: "Hadinet",
      kebele: "16",
      house_number: "NULL",
      phone_number: "+251914000020"
    }
  },
  caps: [
    '/app/emr/admin/user/write',
    '/app/emr/admin/user/delete',
    '/app/emr/admin/user/list',
    '/app/emr/admin/user/role/write',
    '/app/emr/admin/user/role/delete',
    '/app/emr/admin/user/role/read',
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


