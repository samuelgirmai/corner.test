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
    name: "create_person_photo",
    cb: I.create_person_photo,
    arg: [
      {
        type: "func",
        name: "reg_id",
        data: "list_person"
      },
      {
        type: "var",
        name: "uri",
        data: "uri"
      }
    ]
  },
  list_person: {
    name: "list_person",
    cb: I.list_person,
    arg: [
      {
        type: "const",
        name: "state",
        data: "PENDING"
      }
    ]
  }
}

module.exports = async(dstype, num) => {
  await Test(scenario, dstype, num);
}

