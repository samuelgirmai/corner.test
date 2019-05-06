import inquirer from 'inquirer'
import {signup} from './signup'
import {login} from './login'
import {read_history} from './emr'

let access_token = null;

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'MAIN WINDOW',
    choices: ['login', 'signup', 'md-history']
  }
];

async function _start()
{
  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signup':
      await signup();
      access_token = null;  
      break;
    case 'login':
      access_token = await login();
      break;
    case 'md-history':
      await read_history(access_token);
      break;
  }
   _start();
}
_start();

