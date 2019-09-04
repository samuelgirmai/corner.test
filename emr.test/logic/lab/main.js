import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
  create_user,
  get_user,
  list_users,
  create_result,
  read_result,
} from './lab';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Laboratory Test App',
    choices: ['signin', 'signout', 'change.passwd', 'create.user', 'get.user', 'list.users', 'create.result', 'read.result', '<<back']
  }
];

var token = null;

export async function lab_start()
{

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signin':
      token = await signin();
      break;
    case 'signout':
      await signout(token);
      break;
    case 'change.passwd':
      await change_passwd(token);
      break;
    case 'create.user':
      await create_user();
      break;
    case 'get.user':
      await get_user();
      break;
    case 'list.users':
      await list_users();
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

