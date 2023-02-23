import {Test} from '../../../core/logic'
import I from '../../../module/corner/issuance/main'

let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "944377674847",
  user_id: "116262",
  secret: "toor"
}

let scenario = {
  _init: {
    name: "open",
    cb: I.open,
    arg: [
      {
        type: "const",
        name: "config",
        data: CONFIG
      }
    ]
  },
  remove_issue: {
    name: "remove_issue",
    cb: I.remove_issue,
    arg: [
      {
        type: "ctx",
        name: "reg_id",
        data: "list_person"
      }
    ]
  },
  _main: {
    name: "list_person",
    cb: I.list_person,
    arg: [
      {
        type: "const",
        name: "state",
        data: "ISSUED"
      }
    ],
    nxt: "remove_issue"
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

