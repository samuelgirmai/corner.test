import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_security,
  read_history, 
  write_history
} from './emr'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signin', 'signout', 'security', 'history.write','history.read']
  }
];

async function _start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signin':
      await signin();
      break;
    case 'signout':
      await signout();
      break;
    case 'security':
      await change_security();
      break;
    case 'history.write':
      await write_history(token);
      break;
    case 'history.read':
      await read_history(token);
      break;
  }
   _start();
}
_start();

