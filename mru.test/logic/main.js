import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_cofficer,
  read_cofficer,
} from './mru'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signin', 'signout', 'create.cofficer', 'read.cofficer']
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
    case 'create.cofficer':
      await create_cofficer(token);
      break;
    case 'read.cofficer':
      await read_cofficer(token);
      break;
  }
   _start();
}
_start();

