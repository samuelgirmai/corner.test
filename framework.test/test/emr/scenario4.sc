/*
 * a scenario involving card officer, practitioner, pharmacist
 */

import {Test} from '../../core/logic'
import PHM from '../../module/service/emr/pharmacy/pharmacy.js'
import MRU from '../../module/service/emr/mru/mru.js'
import PRT from '../../module/service/emr/practner/practner.js'

let scenario = {
  _start: {
    name: "get_dispense",
    cb: PHM.get_dispense,
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
    cb: PHM.create_dispense,
    arg: [
      {
        type: "func",
        name: "token",
        data: "signin_pharmacist"
      },
      {
        type: "func",
        name: "result",
        data: "create_precord",
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  signin_pharmacist: {
    name: "signin_pharmacist",
    cb: PHM.signin_pharmacist,
    arg: [
      {
        type: "func",
        name: "user",
        data: "get_pharmacist"
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
        name: "token",
        data: "signin_practitioner"
      },
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
  signin_practitioner: {
    name: "signin_practitioner",
    cb: PRT.signin_practitioner,
    arg: [
      {
        type: "func",
        name: "user",
        data: "get_practitioner"
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
        type: "func",
        name: "token",
        data: "signin_cofficer"
      },
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
  signin_cofficer: {
    name: "signin_cofficer",
    cb: MRU.signin_cofficer,
    arg: [
      {
        type: "func",
        name: "user",
        data: "get_cofficer"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  get_pharmacist: {
    name: "get_pharmacist",
    cb: PHM.get_pharmacist,
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
  create_pharmacist: {
    name: "create_pharmacist",
    cb: PHM.create_pharmacist,
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
  }
}

module.exports = async(num) => {
  await Test(scenario, num);
}

