import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_cofficer,
  read_cofficer,
  create_patient,
  read_patient,
  read_stats,
  renew_pcard,
  print_pcard
} from './mru';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signin', 'signout', 'create.cofficer', 'read.cofficer', 'create.patient', 'read.patient', 'read.stats', 'renew.pcard', 'print.pcard', '<<back']
  }
];

export async function mru_start()
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
      await create_cofficer();
      break;
    case 'read.cofficer':
      await read_cofficer(token);
      break;
    case 'create.patient':
      await create_patient(token);
      break;
    case 'read.patient':
      await read_patient(token);
      break;
    case 'read.stats':
      await read_stats(token);
      break;
    case 'renew.pcard':
      await renew_pcard(token);
      break;
    case 'print.pcard':
      await print_pcard(token);
      break;
    case '<<back':
      return;
  }
  mru_start();
}

mru_start();
