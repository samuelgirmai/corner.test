import {Data} from './data'

var stats = {
  failed: 0,
  passed: 0
}

async function Run(f, prog, dstype)
{
  let ret, arg = {};
 
  for(let i = 0; i<f.arg.length; i++){
    if(f.arg[i].type == "func"){
      arg[f.arg[i].name] = await Run(prog[f.arg[i].data], prog, dstype);
    }
    else if(f.arg[i].type == "var"){
      arg[f.arg[i].name] = (await Data(dstype, f.arg[i].data))[f.arg[i].name];
    }
    else if(f.arg[i].type == "const"){
      arg[f.arg[i].name] = f.arg[i].data;
    }
    else{
      Print();
    }
  }

  console.log("running %s ...", f.name);

  ret =  await f.cb(arg);

  if(ret){
    console.log("func (%s) status = \x1b[32m PASS \x1b[0m", f.name);
    ++stats.passed;
  }
  else {
    console.log("func (%s) status = \x1b[31m FAILED \x1b[0m", f.name);
    ++stats.failed;
   }

  return ret;
}

export function Print()
{
  console.log("\n--------------------------\nExecution Summary:"); 
  console.log("   Success: \x1b[32m %s \x1b[0m", stats.passed); 
  console.log("   Failed: \x1b[31m %s \x1b[0m", stats.failed); 
  console.log("---------------------------"); 
}

export function _syntax(prog) 
{
  if(!prog['_main']) {
    return 0;
  }

  return 1;
}

export async function _init(prog, dstype)
{
  let r = await Run(prog['_init'], prog, dstype);

  Print();

  return r;
}

export async function _fini(prog, dstype)
{
  let r = await Run(prog['_fini'], prog, dstype);
  
  Print();

  return r;
}

export async function _main(prog, dstype, loop)
{
  if(isNaN(loop)) {
    console.log('Error: invalid input loop');
    return;
  }

  for(let i = 0; i < loop; i++) {
    await Run(prog['_main'], prog, dstype);
  }

  Print();
}

export async function Test(prog, dstype, loop)
{ 
  if(!_syntax(prog)) {
    console.log("Error: scenario program syntax error");

    return;
  }

  let r = await _init(prog, dstype);

  if(!r) {
    return;
  }

  await _main(prog, dstype, loop);

  /*r = await _fini(prog, dstype);

  if(!r) {
    return;
  }*/
}
