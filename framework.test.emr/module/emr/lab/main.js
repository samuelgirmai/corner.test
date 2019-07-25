import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_user,
  read_user,
  create_result,
  read_result,
} from './lab';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Laboratory Test App',
    choices: ['signin', 'signout', 'create.user', 'read.user', 'create.result', 'read.result', '<<back']
  }
];

export async function lab_start()
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
    case 'create.user':
      await create_user();
      break;
    case 'read.user':
      await read_user(token);
      break;
    case 'create.result':
      await create_result(token);
      break;
    case 'read.result':
      await read_result(token);
      break;
    case '<<back':
      return;
  }
  lab_start();
}

lab_start();

