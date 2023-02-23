/*
 * Informatics Regression test scenario
 */
import {Test} from '../../../core/logic'
import INFO from '../../../module/service/emr/infotics/infotics.js'

let scenario = {
  _start: {
    name: "batch_create_ncod",
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
        data: "ncod"
      },
      {
        type: "var",
        name: "data",
        data: "infotics/ncod"
      }
    ]
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
