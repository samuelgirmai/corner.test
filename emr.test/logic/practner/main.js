import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_user,
  read_user,
  read_precord,
  create_precord,
} from './practner';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Practitioner Test App',
    choices: ['signin', 'signout', 'create.user', 'read.user', 'create.precord', 'read.precord', '<<back']
  }
];

export async function practner_start()
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
    case 'create.precord':
      await create_precord(token);
      break;
    case 'read.precord':
      await read_precord(token);
      break;
    case '<<back':
      return;
  }
  practner_start();
}

practner_start();

