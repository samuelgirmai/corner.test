import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const read_prompt = [
  {
    type: 'input',
    name: 'mrn',
    message: 'Enter MRN: ',
  },
];
const write_prompt = [
  {
    type: 'input',
    name: 'status',
    message: 'Status: ',
  },
  {
    type: 'input',
    name: 'subject_name',
    message: 'Subject Name: ',
  },
  {
    type: 'input',
    name: 'performer_name',
    message: 'Performer Name: ',
  },
];

const type_prompt = [
  {
    type: 'list',
    name: 'type',
    message: 'Type',
    choices: ['observation', '<<Back']     //currently be supports observation data type 
    //choices: ['all', 'person', 'observation', 'medication', '<<Back']
  }
];

export async function read_history(sess)
{
  let info, ret, type;
 
  info = await inquirer.prompt(read_prompt);
 
  if(!info.mrn){
    printMessage(['Invalid MRN'], {borderColor: 'green'});
    return;
  }

  type = await inquirer.prompt(type_prompt);
  if(type.type === '<<Back'){
    return;
  }
  
  info.access_token = sess.access_token;
  ret = await API.read_history(info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }

  printMessage(['History: ', JSON.stringify(ret.history)], {borderColor: 'green'});
}

export async function write_history(sess)
{
  let info, ret, type;

  type = await inquirer.prompt(type_prompt);
  if(type.type === '<<Back'){
    return;
  }

  info = await inquirer.prompt(write_prompt);

  info.resourceType = type.type;
  info.access_token = sess.access_token;
  info.uid = sess.uid;
  info.issued = new Date();

  ret = await API.write_history(info);

  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }
  printMessage(['Diagnosis record saved'], {borderColor: 'green'});
  printMessage(['MRD  ', JSON.stringify(ret.mrn)], {borderColor: 'green'});

}

