import {Test} from '../core/logic'
import MRU from '../module/emr/mru/mru'

let scenario = {
  _start: {
    name: "get_stats",
    cb: MRU.get_stats,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_license: {
    name: "get_license",
    cb: MRU.get_license,
    arg: []
  }
}

module.exports = async(num) => {
  await Test(scenario, num);
}

