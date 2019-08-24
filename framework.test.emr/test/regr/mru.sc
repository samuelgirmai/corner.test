import {Test} from '../../core/logic'
import MRU from '../../module/emr/mru/mru'

let scenario = {
  _start: {
    name: "get_stats",
    cb: MRU.get_stats,
    arg: [
      {
        type: "func",
        name: "blob",
        data: "get_patient"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_patient: {
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
      {
        type: "func",
        name: "user_id",
        data: "get_cofficer"
      },
    ]
  },
  get_cofficer: {
    name: "get_cofficer",
    cb: MRU.get_cofficer,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_cofficer"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_cofficer: {
    name: "create_cofficer",
    cb: MRU.create_cofficer,
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
  for(let i = 0; i<num; i++){
    Test(scenario);
  }
}

