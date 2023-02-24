import {Test} from '../../../core/logic'
import I from '../../../module/corner/issuance/main'

/*let CONFIG = {
  muxer_host: "http://192.168.1.143:22000",
  asset_host: "http://192.168.1.143:22009",
  license: "144429564632",
  user_id: "075866",
  secret: "toor"
}*/

/*let CONFIG = {
  muxer_host: "http://10.60.30.16:22000",
  asset_host: "http://10.60.30.16:22009",
  license: "931106113489",
  user_id: "069873482",
  secret: "toor"
}*/

let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "274908493325",
  user_id: "069470781",
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

