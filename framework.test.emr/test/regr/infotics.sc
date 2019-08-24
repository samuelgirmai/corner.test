/*
 * Informatics Regression test scenario
 */
import {Test} from '../../core/logic'
import INFO from '../../module/emr/infotics/infotics.js'

let scenario = {
  _start: {
    name: "get_idata",
    cb: INFO.get_idata,
    arg: [
      {
        type: "func",
        name: "result",
        data: "create_idata"
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
    cb: INFO.create_idata,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "iid",
        data: "get_informatics"
      }
    ]
  },
  get_informatics: {
    name: "get_informatics",
    cb: INFO.get_informatics,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_informatics"
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
    ]
  },
  create_informatics: {
    name: "create_informatics",
    cb: INFO.create_informatics,
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
    cb: INFO.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}
