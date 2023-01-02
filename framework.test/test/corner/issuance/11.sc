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
    name: "create_person",
    cb: I.create_person,
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
      }
    ]
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

