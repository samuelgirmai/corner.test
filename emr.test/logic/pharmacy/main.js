import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
  create_user,
  get_user,
  list_users,
  read_dispense,
  create_dispense,
} from './pharmacy';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Pharmacy Test App',
    choices: ['signin', 'signout', 'change.passwd','create.user', 'get.user', 'list.users', 'create.dispense', 'read.dispense','<<back']
  }
];

var token = null;

export async function pharmacy_start()
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
    case 'create.dispense':
      await create_dispense(token);
      break;
    case 'read.dispense':
      await read_dispense(token);
      break;
    case '<<back':
      return;
  }
  pharmacy_start();
}

pharmacy_start();

