/*
 * Lab Regression test scenario
 */
import {Test} from '../../../core/logic'
import MRU from '../../../module/service/emr/mru/mru.js'
import PRT from '../../../module/service/emr/practner/practner.js'
import INF from '../../../module/service/emr/infotics/infotics'
import LAB from '../../../module/service/emr/lab/lab.js'

let scenario = {
  _start: {
    name: "get_result",
    cb: LAB.get_result,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_result"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_result: {
    name: "create_result",
    cb: LAB.create_result,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_order"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_order: {
    name: "create_order",
    cb: PRT.create_order,
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
      {
        type: "func",
        name: "iid",
        data: "create_idata"
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
  create_idata: {
    name: "create_idata",
    cb: INF.create_idata,
    arg: [
      {
        type: "var",
        name: "data",
        data: "infotics/lab"
      },
      {
        type: "const",
        name: "type",
        data: "lab"
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

