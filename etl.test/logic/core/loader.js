const API = require('../../tools/net.js');
const CONFIG = require('../../config/config.js');
const chalk = require('chalk');

async function create_patient(pati)
{
  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
       pii: pati.pii,
       mrn: pati.mrn 
    }
  }

  return await API.run(data, '/app/emr/mru/patient/etl/write');

}

process.on('message', async function(tasks){
  for(let i = 0; i < tasks.length; i++){
      let r = await create_patient(tasks[i]);
      
      if(r.status != 'err'){
        console.log(`WORKER@ TASK ${chalk.green('PASS')}`);
      }else{
        console.log(`WORKER@ TASK ${chalk.red('FAILD')}`);
      }
  }

  process.send('more');
});