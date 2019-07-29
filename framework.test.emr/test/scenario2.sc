import MRU from '../module/emr/mru/mru'

module.exports = {
  _start: {
    cb: MRU.get_patient,
    arg: [
      {
        type: "func",
        name: "mrn",
        data: "create_patient"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  create_patient: {
    cb: MRU.create_patient,
    arg: [
      {
        type: "var",
        name: "pii",
        data: "pii"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  get_license: {
    cb: MRU.get_license,
    arg: []
  },
}

