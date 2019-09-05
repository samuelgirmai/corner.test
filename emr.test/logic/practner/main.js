import inquirer from 'inquirer'

import {
  create_opd,
  get_opd,
  subscribe_notification,
  signin,
  signout,
  change_password,
  create_user,
  get_user,
  list_users,
  read_stats,
  read_precord,
  create_precord,
  modify_precord,
  remove_precord,
} from './practner';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Practitioner Test App',
    choices: ['create.opd', 'get.opd', 'subscribe', 'signin', 'signout', 'create.user', 'get.user', 'list.users', 'create.precord', 'read.precord', 'modify.precord','remove.precord','read.stats','<<back']
  }
];

var token = null;
export async function practner_start()
{

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'subscribe':
      await subscribe_notification();
      break;
    case 'signin':
      token = await signin();
      break;
    case 'signout':
      await signout(token);
      break;
    case 'change.password':
      await change_password(token);
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
    case 'create.precord':
      await create_precord(token);
      break;
    case 'read.precord':
      await read_precord(token);
      break;
    case 'modify.precord':
      await modify_precord(token);
      break;
    case 'remove.precord':
      await remove_precord(token);
      break;
    case 'read.stats':
      await read_stats(token);
      break;
    case 'create.opd':
      await create_opd(token);
      break;
    case 'get.opd':
      await get_opd(token);
      break;
    case '<<back':
      return;
  }
  practner_start();
}

practner_start();

