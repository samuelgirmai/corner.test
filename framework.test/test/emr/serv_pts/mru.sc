import {Test, Print} from '../../../core/logic'
import MRU from '../../../module/service/emr/mru/mru'
import TRG from '../../../module/service/emr/triage/triage'
import PRT from '../../../module/service/emr/practner/practner'

let scenario = {
  _start: {
    name: "assign_patient",
    cb: TRG.create_assign,
    arg: [
      {
        type: "func",
        name: "mrn",
        data: "print_pcard"
      },
      {
        type: "func",
        name: "opd_id",
        data: "create_opd"   /* used to create valid input data?*/
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  print_pcard: {
    name: "print_pcard",
    cb: MRU.print_pcard,
    arg: [
      {
        type: "func",
        name: "patient",
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
      }
    ]
  },
  create_opd: {
    name: "create_opd",
    cb: PRT.create_opd,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_license: {
    name: "get_license",
    cb: MRU.get_license,
    arg: []
  },
}

module.exports = async(num) => {
  Test(scenario, num);
}

