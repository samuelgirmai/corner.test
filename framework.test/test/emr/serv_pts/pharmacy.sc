import {Test, Print} from '../../../core/logic'
import MRU from '../../../module/service/emr/mru/mru'
import PAY from '../../../module/service/emr/payment/payment'
import FIN from '../../../module/service/emr/finance/finance'
import PRT from '../../../module/service/emr/practner/practner'
import PHM from '../../../module/service/emr/pharmacy/pharmacy'
import INF from '../../../module/service/emr/infotics/infotics'

let scenario = {
  _start: {
    name: "create_payment",
    cb: PAY.create_payment,
    arg: [
      {
        type: "func",
        name: "result",
        data: "get_items"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_items: {
    name: "get_items",
    cb: PHM.get_items,
    arg: [
      {
        type: "func",
        name: "result",
        data: "get_outcome"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_outcome: {
    name: "get_outcome",
    cb: PRT.get_outcome,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_outcome"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  /*
   * The ff scenario create input data for pharmacy service point scenarios.
   */
  create_outcome: {
    name: "create_outcome",
    cb: PRT.create_outcome,
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
        data: "create_account"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_account: {
    name: "create_account",
    cb: FIN.create_account,
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
  create_idata: {
    name: "create_idata",
    cb: INF.create_idata,
    arg: [
      {
        type: "var",
        name: "data",
        data: "infotics/drug"
      },
      {
        type: "const",
        name: "type",
        data: "drug"
      },
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

