/*
 * Auth-client setup scenario
 */
import {Test} from '../../core/logic'
import CAP from '../../module/platform/auth/cap'
import SRV from '../../module/platform/auth/service';

let scenario = {
  _start: {
    name: "update_config",
    cb: SRV.update_config,
    arg: [
      {
        type: "func",
        name: "service",
        data: "get_service"
      },
      {
        type: "func",
        name: "conf",
        data: "get_config"
      },
      {
        type: "func",
        name: "blob",              /*FIXME:*/
        data: "next_srv"
      }
    ]
  },
  get_service: {
    name: "get_service",
    cb: SRV.get_service,
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
    cb: CAP.export_caps,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "caps",
        data: "get_expCaps"
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
    cb: CAP.allow_caps,
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
    cb: SRV.create_service,
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
  get_config: {
    name: "get_config",
    cb: SRV.get_config,
    arg: [
      {
        type: "func",
        name: "sii",
        data: "get_sii"
      },
    ]
  },
  get_capId: {
    name: "get_capId",
    cb: CAP.get_capId,
    arg: [
      {
        type: "func",
        name: "caps",
        data: "get_allowedCaps"
      },
    ]
  },
  get_expCaps: {
    name: "get_expCaps",
    cb: CAP.get_expCaps,
    arg: [
      {
        type: "func",
        name: "sii",
        data: "get_sii"
      }
    ]
  },
  get_sii: {
    name: "get_sii",
    cb: SRV.get_sii,
    arg: [] 
  },
  get_allowedCaps: {
    name: "get_allowedCaps",
    cb: SRV.get_allowedCaps,
    arg: []
  },
  get_license: {
    name: "get_license",
    cb: SRV.get_license,
    arg: []
  },
  next_srv: {
    name: "next_srv",
    cb: SRV.next_srv,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}
