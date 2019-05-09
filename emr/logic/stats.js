import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const stats_prompt = [
  {
    type: 'input',
    name: 'uid',
    message: 'Enter Practitioner ID: ',
  },
];

export async function get_stats(sess)
{
  let info, ret;
 
  info = await inquirer.prompt(stats_prompt);
 
  if(!info.uid){
    printMessage(['ERROR: please enter valid id'], {borderColor: 'green'});
    return;
  }

  info.access_token = sess.access_token;
  ret = await API.get_stats(info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }

  printMessage(['Statistics: ', JSON.stringify(ret.stats)], {borderColor: 'green'});
}
