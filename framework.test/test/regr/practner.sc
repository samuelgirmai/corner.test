/*
 * Test scenario involving card officer, practitioner
 */
import {Test} from '../../core/logic'
import MRU from '../../module/emr/mru/mru.js'
import PRT from '../../module/emr/practner/practner.js'

let scenario = {
  _start: {
    name: "get_precord",
    cb: PRT.get_precord,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_precord"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_precord: {
    name: "create_precord",
    cb: PRT.create_precord,
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
      },
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
  get_practitioner: {
    name: "get_practitioner",
    cb: PRT.get_practitioner,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_practitioner"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_practitioner: {
    name: "create_practitioner",
    cb: PRT.create_practitioner,
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
    cb: PRT.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}

