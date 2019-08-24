import inquirer from 'inquirer'

import {
  subscribe_notification,
  signin,
  signout,
  change_password,
  create_user,
  read_user,
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
    choices: ['subscribe', 'signin', 'signout', 'create.user', 'read.user', 'create.precord', 'read.precord', 'modify.precord','remove.precord','read.stats','<<back']
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
    case 'read.user':
      await read_user();
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
    case '<<back':
      return;
  }
  practner_start();
}

practner_start();

