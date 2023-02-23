import {Test, Print} from '../../../core/logic'
import PRF from '../../../module/perf/main'

let scenario = {
  _start: {
    name: "perf_report",
    cb: PRF.perf_report,
    arg: [
      {
        type: "func",
        name: "file",
        data: "perf_run"
      },
    ]
  },
  perf_run: {
    name: "perf_run",
    cb: PRF.perf_run,
    arg: [
      {
        type: "func",
        name: "ops",    //UNUSED
        data: "perf_init"
      },
      {
        type: "const",
        name: "scenario",
        data: "triage.json", //artillery scenario to apply; located in modules/perf/tools/artillery/scenarios
      }
    ]
  },
  perf_init: {                         /*initialize perf tool to use*/
    name: "perf_init",
    cb: PRF.perf_init,
    arg: [
      {
        type: "const",
        name: "tool",
        data: "artillery",
      }
    ]
  }
}

module.exports = async(num) => {
  Test(scenario, num);
}
