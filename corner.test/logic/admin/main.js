import inquirer from 'inquirer'

import {
  create_user,
  remove_user,
  list_users,
  assign_role,
  revoke_role,
  get_role,
  get_stats,
  signin
} from './admin';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'admin test window',
    choices: ['signin', 'create.user', 'remove.user', 'list.users', 'assign.role', 'revoke.role', 'get.role', 'get.stats', '<<back']
  }
];

var token = null;

export async function admin_start()
{
  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'create.user':
      await create_user(token);
      break;
    case 'remove.user':
      await remove_user(token);
      break;
    case 'list.users':
     await list_users(token);
     break;
    case 'assign.role':
      await assign_role(token);
      break;
    case 'revoke.role':
      await revoke_role(token);
      break;
    case 'get.role':
      await get_role(token);
      break;
    case 'get.stats':
      await get_stats(token);;
      break;
    case 'signin':
      token = await signin();;
      break;
    case '<<back':
      return;
  }
  admin_start();
}

admin_start();
