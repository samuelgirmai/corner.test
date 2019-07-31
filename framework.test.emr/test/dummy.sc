import {Test} from '../core/logic'
import MRU from '../module/emr/mru/mru_dummy.js'

let scenario = {
  _start: {
    name: "get_patient",
    cb: MRU.get_patient,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_patient"
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
        data: 'pii'
      }
    ]
  },
  signin_cofficer: {
    name: "signin_cofficer",
    cb: MRU.signin_cofficer,
    arg: [
      {
        type: "func",
        name: "security",
        data: "create_cofficer"
      }
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
      }
    ]
  }
}

module.exports = async(num) => {
  for(let i = 0; i < num; i++){
    await Test(scenario);
  }
}
