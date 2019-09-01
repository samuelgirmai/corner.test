/*
 * Auth-client service setup test scenario
 */
import {Test} from '../../core/logic'
import AUTH from '../../module/platform/auth/setup'

let scenario = {
  _start: {
    name: "update_config",
    cb: AUTH.update_config,
    arg: [
      {
        type: "func",
        name: "result",
        data: "list_service"
      }
    ]
  },
  list_service: {
    name: "list_service",
    cb: AUTH.list_service,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "user_id",
        data: "export_caps"
      }
    ]
  },
  export_caps: {
    name: "export_caps",
    cb: AUTH.export_caps,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "user_id",
        data: "allow_caps"
      }
     ]
  },
  allow_caps: {
    name: "allow_caps",
    cb: AUTH.allow_caps,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
         type: "func",
         name: "user_id",
         data: "create_service"
      },
      {
        type: "func",
        name: "caps",
        data: "get_capId"
      },
     ]
  },
  create_service: {
    name: "create_service",
    cb: AUTH.create_service,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "sii",
        data: "get_sii"
      }
    ]
  },
  get_caps: {
    name: "get_caps",
    cb: AUTH.get_caps,
    arg: []
  },
  get_sii: {
    name: "get_sii",
    cb: AUTH.get_sii,
    arg: [] 
  },
  get_license: {
    name: "get_license",
    cb: AUTH.get_license,
    arg: []
  },
  get_capId: {
    name: "get_capId",
    cb: AUTH.get_capId,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}

