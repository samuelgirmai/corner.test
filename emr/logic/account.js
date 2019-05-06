import inquirer from 'inquirer'
import API from '../api/api_rest';
import CONFIG from '../config/config'

var printMessage = require('print-message');

const signup_prompt = [
  {
    type: 'input',
    name: 'full_name',
    message: 'Full Name: ',
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
const type_prompt = [
  {
    type: 'list',
    name: 'type',
    message: 'Select Account Type',
    choices: ['Admin', 'Other', '<<Back']
  }
];

const main_prompt = [
  {
    type: 'list',
    name: 'action',
    message: 'EMR Application',
    choices: ['Signup', 'Login']
  }
];

async function signup()
{
  let prop, signup_info, ret, type;
 
  type = await inquirer.prompt(type_prompt);

  if(type.type === '<<Back'){
    return;
  }
  signup_info = await inquirer.prompt(signup_prompt);
  signup_info.type = (type.type === 'Other')?0:1;

  if(!signup_info.phone_number || !signup_info.email){
    printMessage(['Phone or Email unavailable'], {borderColor: 'green'});
    return;
  }

  ret = await API.signup(signup_info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }

  printMessage(['Account Created'], {borderColor: 'green'});
  printMessage(['Info: ', JSON.stringify(signup_info)], {borderColor: 'green'});

}
async function login()
{
  let prop, login_info, ret;
 
  login_info = await inquirer.prompt(login_prompt);

  if(!login_info.phone_number || !login_info.passwd){
    printMessage(['Please Enter Login Information'], {borderColor: 'green'});
    return;
  }
  ret = await API.login(login_info);
  
  if(ret.error){
    printMessage([ret.error], {borderColor: 'green'});
    return;
  }
  printMessage(['Login Successfull'], {borderColor: 'green'});
  printMessage([JSON.stringify(ret.session)], {borderColor: 'green'});
  await home(ret.session.skey);
}
async function  home(skey)
{
  printMessage(['Welcome to EMR Application'], {borderColor: 'green'});
  await inquirer.prompt({type: 'list', name: 'loguot', message: '<', choices: ['Logout']});

  await API.logout(skey);
  return;
}
exports.main = async () => {

  let res = await inquirer.prompt(main_prompt);

  switch(res.action){
    case 'Signup':
      await signup(); 
      break;
    case 'Login':
      await login();
      break;
    case '<<Back':
      break;
  }
}