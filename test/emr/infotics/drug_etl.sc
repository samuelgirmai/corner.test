/*
 * @etl
 */
import {Test} from '../../../core/logic'
import INFO from '../../../module/service/emr/infotics/infotics.js'

let scenario = {
  _start: {
    name: "batch_create_drug",
    cb: INFO.batch_create_idata,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "const",
        name: "type",
        data: "drug"
      },
      {
        type: "func",
        name: "data",
        data: "load_idata"
      }
    ]
  },
  load_idata: {
    name: "load_idata",
    cb: INFO.load_idata,
    arg: []
  },
  get_license: {
    name: "get_license",
    cb: INFO.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}
