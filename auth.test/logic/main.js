import inquirer from 'inquirer'
import {signup, signin, signout} from './auth'
import {read_history, write_history} from './emr'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signup', 'signin', 'history.write','history.read', 'signout']
  }
];

async function _start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signup':
      await signup();
      break;
    case 'signin':
      token = await signin();
      break;
    case 'history.write':
      await write_history(token);
      break;
    case 'history.read':
      await read_history(token);
      break;
    case 'signout':
      await signout(token);
      break;
  }
   _start();
}
_start();

