import {artillery_ops} from './tools/artillery/main'

var perf_ops = {};

export function perf_run(arg)
{
  console.log(arg);
 
  let r = perf_ops.run(arg.scenario);

  return r;
}

export function perf_report(arg)
{
  let r = perf_ops.report(arg.file);
  
  return r;
}

export function perf_init(arg)
{
  switch(arg.tool){
    case 'artillery':
      perf_ops = artillery_ops;
      break;
    case 'autocannon':
      //perf_ops = autocannon_ops;
      break;
     /*...*/
  }
  return true;
}

const PRF = {
  perf_run:    perf_run,
  perf_report: perf_report,
  perf_init:   perf_init
};

export default PRF;
