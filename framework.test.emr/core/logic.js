import {
  Data
} from './data'

async function Run(f, prog)
{
  let arg = {};
  
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
  }

  return await f.cb(arg);
}

export function Test(prog)
{
  Run(prog['_start'], prog);
}

