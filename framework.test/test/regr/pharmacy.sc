/*
 * Pharmacy Regression test scenario
 */
import {Test} from '../../core/logic'
import MRU from '../../module/emr/mru/mru.js'
import PRT from '../../module/emr/practner/practner.js'
import PHY from '../../module/emr/pharmacy/pharmacy.js'

let scenario = {
  _start: {
    name: "get_dispense",
    cb: PHY.get_dispense,
    arg: [
      {
        type: "func",
        name: "did",
        data: "create_dispense"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_dispense: {
    name: "create_dispense",
    cb: PHY.create_dispense,
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
        name: "user_id",
        data: "get_pharmacist"
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
      }
    ]
  },
  get_pharmacist: {
    name: "get_pharmacist",
    cb: PHY.get_pharmacist,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_pharmacist"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_pharmacist: {
    name: "create_pharmacist",
    cb: PHY.create_pharmacist,
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
    cb: PHY.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}

