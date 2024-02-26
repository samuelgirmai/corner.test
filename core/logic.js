import { createClient } from 'redis';
const REDC = createClient();
REDC.on('error', err => console.log('Redis Client Error', err));


import {Data} from './data'

var stats = {
  failed: 0,
  passed: 0
}

var CTX = {};

var PROFILE = {};

export async function CTX_put(ctx_name, key, val)
{
  //NOTE: STORE in REDIS

  await REDC.set("framework.test/"+ctx_name+key, val)

  /*if(!CTX[ctx_name]) {
    CTX[ctx_name] = {};
  }

  CTX[ctx_name][key] = val;*/
}

export async function CTX_get(ctx_name, key)
{
  return await REDC.get("framework.test/"+ctx_name+key);

  //return CTX[ctx_name][key]
}

async function Run(f, prog, dstype, argv)
{
  let avg, t1, t2, ret = null, arg = {};

  for(let i = 0; i<f.arg.length; i++){
    if(f.arg[i].type == "ctx"){
      arg[f.arg[i].name] = await CTX_get(f.arg[i].data, f.arg[i].name);
    }
    else if(f.arg[i].type == "var"){
      arg[f.arg[i].name] = (await Data(dstype, f.arg[i].data))[f.arg[i].name];
    }
    else if(f.arg[i].type == "const"){
      arg[f.arg[i].name] = f.arg[i].data;
    }
    else if(f.arg[i].type == "arg"){
      arg[f.arg[i].name] = argv;
    }
    else{
      console.log("Error: scenario program syntax error. unknown type '%s'", f.arg[i].type);
      return ret;
    }
  }

  console.log("running %s ...", f.name);

  t1 = process.hrtime.bigint();

  ret =  await f.cb(arg, f.name);

  t2 = process.hrtime.bigint();

  avg = t2-t1;//Number((t2 - t1) / BigInt(10 ** 6));

  ++PROFILE[f.name].tot_cnt;

  PROFILE[f.name].avg_time = PROFILE[f.name].avg_time + avg;

  if(ret) {
    ++PROFILE[f.name].pass_cnt

    console.log("func (%s) status = \x1b[32m PASS \x1b[0m", f.name);
    ++stats.passed;
  }
  else {
    ++PROFILE[f.name].fail_cnt;
    console.log("func (%s) status = \x1b[31m FAILED \x1b[0m", f.name);
    ++stats.failed;
  }

  if(ret && f.nxt && prog[f.nxt]) {
    ret = await Run(prog[f.nxt], prog, dstype, argv);
  }

  return ret;
}

export function Print()
{
  let p = Object.keys(PROFILE);

  for(let i = 0; i < p.length; i++) {
    if(PROFILE[p[i]].tot_cnt) {
      PROFILE[p[i]].avg_time = (Number(PROFILE[p[i]].avg_time / BigInt(PROFILE[p[i]].tot_cnt)))/10**6
    }
  }

  console.log("\n\nExecution Summary");
  console.table(PROFILE);

  //console.log("   Success: \x1b[32m %s \x1b[0m", stats.passed); 
  //console.log("   Failed: \x1b[31m %s \x1b[0m", stats.failed); 
}

export function _syntax(prog) 
{
  if(!prog['_main']) {
    return 0;
  }

  return 1;
}

function _setup_profiling(prog)
{
  let o, p;

  p = Object.keys(prog);
 
  for(let i=0; i<p.length; i++) {
    o = prog[p[i]];

    PROFILE[o.name] = {};
    PROFILE[o.name]["tot_cnt"] = 0;
    PROFILE[o.name]["avg_time"] = BigInt(0);
    PROFILE[o.name]["pass_cnt"] = 0;
    PROFILE[o.name]["fail_cnt"] = 0;
    PROFILE[o.name]["pass_avg_time"] = 0;
    PROFILE[o.name]["fail_avg_time"] = 0;
  }
}

export async function _init(prog, dstype)
{
  let r = await Run(prog['_init'], prog, dstype);

  //Print();

  return r;
}

export async function _fini(prog, dstype)
{
  let r = await Run(prog['_fini'], prog, dstype);
  
  Print();

  return r;
}

export async function _main(prog, dstype, loop, arg)
{
  if(isNaN(loop)) {
    console.log('Error: invalid input loop');
    return;
  }

  for(let i = 0; i < loop; i++) {
    await Run(prog['_main'], prog, dstype, arg);
  }

  Print();
}

export async function Test(prog, dstype, loop, arg)
{ 
  await REDC.connect();

  let s = _syntax(prog);


  if(!s) {
    console.log("Error: scenario program syntax error");

    //return;
  }

  _setup_profiling(prog);

  let r = await _init(prog, dstype);

  if(!r) {
    return;
  }

  if(s) {
    await _main(prog, dstype, loop, arg);
  }

  /*r = await _fini(prog, dstype);

  if(!r) {
    return;
  }*/
}
