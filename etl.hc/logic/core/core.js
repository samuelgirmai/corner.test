const os = require('os');
const chalk = require('chalk'); 

const { 
  fork
} = require('child_process');

let FLAG = false
let COUNT = 0;  
/* task distrbution */
function dis_task(worker,data, base, chunk, remain)
{ 
  console.log(`Remaining=${remain} Base=${base}`);
  if(remain <= chunk){
    if(FLAG){
      COUNT++;
    }else{
      worker.send(data.slice(base, base + (remain -1)));
      FLAG = true
    }

    if(COUNT == os.cpus().length){
      console.log(`Etl completed`);
      process.exit(0);
    }
  }else{
    worker.send(data.slice(base, base + chunk));
    base += chunk;
    remain -= base;
  }
}


module.exports = function  loader(data)
{
  let base = 0,chunk = 1000, remain = data.length;

  const cpus = os.cpus().length;
  console.log(`CORES Found ${chalk.blue(cpus)}`);

  for(let c = 0 ;c < cpus;c++){
    const worker_proc = fork(__dirname + '/loader.js');
    
    dis_task(worker_proc, data, base, chunk, remain);
    worker_proc.on('message', function(msg){
      if(typeof msg == 'string' && msg == 'more'){
        dis_task(worker_proc, data ,base, chunk, remain);
      }
    });
  }
}