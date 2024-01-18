import {Test} from '../../../core/logic'
import I from '../../../module/corner/issuance/main'

let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "492034051186",
  user_id: "360942337",
  secret: "toor"
}

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
  user_id: "620422793",
  secret: "toor"
}*/

/*let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "274908493325",
  user_id: "069470781",
  secret: "toor"
}*/

/*let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "470717000240",
  user_id: "967990288",
  secret: "toor"
}*/

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

