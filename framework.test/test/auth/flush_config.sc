/*
 * Flush config files
 */
import {Test} from '../../core/logic'
import SRV from '../../module/platform/auth/flush_config';

let scenario = {
  _start: {
    name: "update_config",
    cb: SRV.update_config,
    arg: []
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}
