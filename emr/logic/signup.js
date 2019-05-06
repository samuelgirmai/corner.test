import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const signup_prompt = [
  {
    type: 'input',
    name: 'given',
    message: 'Given Name: ',
  },
  {
    type: 'input',
    name: 'family',
    message: 'Family Name: ',
  },
  {
    type: 'input',
    name: 'phone_number',
    message: 'Phone Number: ',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email: ',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password: ',
  }
];

const type_prompt = [
  {
    type: 'list',
    name: 'type',
    message: 'Account Type',
    choices: ['practitioner', 'patient', '<<Back']
  }
];

export async function signup()
{
  let info, ret, type;
 
  info = await inquirer.prompt(signup_prompt);

  if(!info.phone_number){
    printMessage(['Phone unavailable'], {borderColor: 'green'});
    return;
  }
  type = await inquirer.prompt(type_prompt);
  if(type.type === '<<Back'){
    return;
  }
  info.resourceType = type.type;

  ret = await API.signup(info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }
  printMessage(['Account Created'], {borderColor: 'green'});
  printMessage(['Info: ', JSON.stringify(info)], {borderColor: 'green'});

}
