import {Test} from '../core/logic'
import MRU from '../module/emr/mru/mru'

let scenario = {
  _start: {
    name: "get_patient",
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
    name: "create_patient",
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
    name: "get_license",
    cb: MRU.get_license,
    arg: []
  },
}

module.exports = (num) => {
  Test(scenario, num);
}

