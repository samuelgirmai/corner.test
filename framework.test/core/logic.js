import {
  Data
} from './data'

var stats = {
  failed: 0,
  passed: 0
}

async function Run(f, prog)
{
  let ret, arg = {};
  
  for(let i = 0; i<f.arg.length; i++){
    if(f.arg[i].type == "func"){
      arg[f.arg[i].name] = await Run(prog[f.arg[i].data], prog);
    }
    else if(f.arg[i].type == "var"){
      arg[f.arg[i].name] = await Data(f.arg[i].data);
    }
    else if(f.arg[i].type == "const"){
      arg[f.arg[i].name] = f.arg[i].data;
    }
    else
        Print();
  }

  console.log("running func(%s) ...", f.name);

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

export async function Test(prog, loop)
{ 
  if(isNaN(loop)){
    console.log('Error: invalid input loop');
    return;
  }

  for(let i = 0; i < loop; i++)
    await Run(prog['_start'], prog);

  Print();
}
