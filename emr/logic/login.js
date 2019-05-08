import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const login_prompt = [
  {
    type: 'input',
    name: 'phone_number',
    message: 'Phone Number: ',
  },
  {
    type: 'password',
    name: 'passwd',
    message: 'Password: ',
  },
];

export async function login()
{
  let info, ret;
 
  info = await inquirer.prompt(login_prompt);

  if(!info.phone_number || !info.passwd){
    printMessage(['Please Enter Login Information'], {borderColor: 'green'});
    return null;
  }
  ret = await API.login(info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return null;
  }
  printMessage(['Login Successfull'], {borderColor: 'green'});
  printMessage([JSON.stringify(ret.session)], {borderColor: 'green'});

  return ret.session;
}
