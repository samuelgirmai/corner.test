import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
  create_user,
  read_user,
  read_assign,
  create_assign,
  remove_assign,
  update_assign,
  update_status,
  read_stats
} from './triage';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Triage test app',
    choices: ['signin', 'signout', 'change.passwd','create.user', 'read.user', 'create.assign', 'read.assign', 'update.status', 'update.assign', 'remove.assign','read.stats', '<<back']
  }
];

var token  = null;
export async function triage_start()
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
    case 'read.user':
      await read_user();
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
    case 'remove.assign':
      await remove_assign(token);
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

