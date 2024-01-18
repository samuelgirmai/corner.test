import {Test} from '../../../core/logic'
import I from '../../../module/corner/issuance/main'

let CONFIG = {
  muxer_host: "http://localhost:22000",
  asset_host: "http://localhost:22009",
  license: "739984095660",
  user_id: "620422793",
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
  _main: {
    name: "list_auth_person",
    cb: I.list_auth_person,
    arg: [],
    nxt: "modify_auth_person"
  },
  modify_auth_person: {
    name: "modify_auth_person",
    cb: I.modify_auth_person2,
    arg: [
      {
        type: "ctx",
        name: "user_id",
        data: "list_auth_person"
      },
      {
        type: "var",
        name: "pii",
        data: "pii"
      }
    ]
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

