import {Test} from '../../../core/logic'
import I from '../../../module/corner/issuance/main'

let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "235775209229",
  user_id: "736094",
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
  _main: {
    name: "create_issue",
    cb: I.create_issue,
    arg: [
      {
        type: "var",
        name: "reg_id",
        data: "reg_id"
      },
      {
        type: "var",
        name: "pii",
        data: "pii"
      },
      {
        type: "var",
        name: "uri",
        data: "uri"
      }
    ],
    nxt: "modify_issue"
  },
  modify_issue: {
    name: "modify_issue",
    cb: I.modify_issue,
    arg: [
      {
        type: "ctx",
        name: "reg_id",
        data: "create_issue"
      },
      {
        type: "var",
        name: "pii",
        data: "pii"
      },
      {
        type: "var",
        name: "uri",
        data: "uri"
      }
    ]
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

