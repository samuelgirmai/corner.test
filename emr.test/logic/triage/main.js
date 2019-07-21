import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_user,
  read_user,
  read_assign,
  create_assign,
  update_assign,
  update_status,
  read_stats
} from './triage';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Triage test app',
    choices: ['signin', 'signout', 'create.user', 'read.user', 'create.assign', 'read.assign', 'update.status', 'update.assign', 'read.stats', '<<back']
  }
];

export async function triage_start()
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
    case 'create.assign':
      await create_assign(token);
      break;
    case 'read.assign':
      await read_assign(token);
      break;
    case 'update.assign':
      await update_assign(token);
      break;
    case 'update.status':
      await update_status(token);
      break;
    case 'read.stats':
      await read_stats(token);
      break;
    case '<<back':
      return;
  }
  triage_start();
}

triage_start();

