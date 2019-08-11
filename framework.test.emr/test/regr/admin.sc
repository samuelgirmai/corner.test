/*
 * Admin test scenario
 */
import {Test} from '../../core/logic'
import ADMIN from '../../module/emr/admin/admin'

let scenario = {
  _start: {
    name: "get_role",
    cb: ADMIN.get_role,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "user_id",
        data: "assign_role"
      }
    ]
  },
  assign_role: {
    name: "assign_role",
    cb: ADMIN.assign_role,
    arg: [
      {
        type: "func",
        name: "user_id", 
        data: "create_user",
      },
      {
        type: "func",
        name: "license",
        data: "get_license"
      },
      {
        type: "func",
        name: "user_type",
        data: "get_userType"
      }
    ]
  },
  create_user: {
    name: "create_user",
    cb: ADMIN.create_user,
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
      {
        type: "func",
        name: "user_type",
        data: "get_userType"
      }
    ]
  },
  get_userType: {
    name: "get_userType",
    cb: ADMIN.get_userType,
    arg: [] 
  },
  get_license: {
    name: "get_license",
    cb: ADMIN.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  for(let i = 0; i < num; i++){
    await Test(scenario);
  }
}

