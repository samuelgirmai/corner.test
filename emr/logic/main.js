import inquirer from 'inquirer'
import {signup} from './signup'
import {login} from './login'
import {read_history, write_history} from './history'

let sess = {}

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'MAIN WINDOW',
    choices: ['login', 'signup', 'mhistory.read','mhistory.write']
  }
];

async function _start()
{
  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signup':
      await signup();
      sess.access_token = null;  
      break;
    case 'login':
      sess = await login();
      break;
    case 'mhistory.read':
      await read_history(sess);
      break;
    case 'mhistory.write':
      await write_history(sess);
      break;
  }
   _start();
}
_start();

