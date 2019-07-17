import inquirer from 'inquirer'

import {
  create_user,
  remove_user,
  list_users,
  assign_role,
  revoke_role,
  get_role,
  get_stats
} from './admin';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'admin test window',
    choices: ['create.user', 'remove.user', 'list.users', 'assign.role', 'revoke.role', 'get.role', 'get.stats', '<<back']
  }
];

export async function admin_start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'create.user':
      await create_user();
      break;
    case 'remove.user':
      await remove_user();
      break;
    case 'list.users':
     await list_users();
     break;
    case 'assign.role':
      await assign_role();
      break;
    case 'revoke.role':
      await revoke_role();
      break;
    case 'get.role':
      await get_role();
      break;
    case 'get.stats':
      await get_stats();;
      break;
    case '<<back':
      return;
  }
  admin_start();
}

admin_start();
