import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const emr_prompt = [
  {
    type: 'input',
    name: 'mrn',
    message: 'Enter MRN: ',
  },
];
const emr_type_prompt = [
  {
    type: 'list',
    name: 'type',
    message: 'Enter Resource Type',
    choices: ['all', 'person', 'observation', 'medication', '<<Back']
  }
];

export async function read_history(token)
{
  let info, ret, type;
 
  info = await inquirer.prompt(emr_prompt);
 
  if(!info.mrn){
    printMessage(['Invalid MRN'], {borderColor: 'green'});
    return;
  }

  type = await inquirer.prompt(emr_type_prompt);
  if(type.type === '<<Back'){
    return;
  }
  
  info.access_token = token;
  ret = await API.read_history(info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }

  printMessage(['History: ', JSON.stringify(ret.md_history)], {borderColor: 'green'});
}
