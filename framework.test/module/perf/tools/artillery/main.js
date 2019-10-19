const fs = require('fs');
const {spawn} = require('child_process');

var SCENARIO_DIR = './module/perf/tools/artillery/scenarios/';
var OUTPUT_DIR = './output/'; 

export  async function run(file)
{
  if(!fs.existsSync(SCENARIO_DIR+file)){
    return false;
  }

  console.log("\n>>> Load test output\n*****************************\n");

  let r = spawn('artillery',['run' , SCENARIO_DIR + file, '-o', OUTPUT_DIR + file],
            {stdio: [process.stdout, process.stdin, process.stderr]});
 
   
  let status = await onEnd(r);

  if(status === 'success')
    return file;

  return false;
}

export async function report(file)
{
  if(!fs.existsSync(OUTPUT_DIR)){
    return false;
  }

  let r = spawn('artillery',['report' , OUTPUT_DIR+ file], 
            {stdio: [process.stdout, process.stdin, process.stderr]});

  let status = await onEnd(r);

  if(status == 'success')
    return true;
  
  return false
}

/*helper func to wait child process artillery..*/
function onEnd(cp)
{
  return new Promise((resolve, reject) => {
    cp.once('exit', (code, signal) => {
      if(code === 0) {
        resolve('success');
      } else {
        reject(new Error('Exit with erro code: '+code));
      }
    });
    cp.once('error', (err) => {
      reject(err);
    });
  });
}

export const artillery_ops = {
  run:    run,
  report: report,
};

