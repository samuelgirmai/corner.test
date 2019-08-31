/*
 * Lab Regression test scenario
 */
import {Test} from '../../core/logic'
import MRU from '../../module/emr/mru/mru.js'
import TRG from '../../module/emr/triage/triage.js'

let scenario = {
  _start: {
    name: "get_assign",
    cb: TRG.get_assign,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_assign"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_assign: {
    name: "create_assign",
    cb: TRG.create_assign,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "mrn",
        data: "create_patient"
      },
      {
        type: "func",
        name: "user",
        data: "get_triage"
      },
    ]
  },
  get_triage: {
    name: "get_triage",
    cb: TRG.get_triage,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_triage"
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
  create_triage: {
    name: "create_triage",
    cb: TRG.create_triage,
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
    cb: TRG.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}

