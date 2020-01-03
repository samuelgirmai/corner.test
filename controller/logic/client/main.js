import inquirer from 'inquirer'

import {
  controller_start
} from '../main'

import {
  create,
  allow
} from './controller';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['create', 'allow', '<<back']
  }
];

export async function client_controller()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'create':
      await create();
      break;
    case 'allow':
      await allow();
      break;
    case '<<back':
      //controller_start();
      return
  }

  client_controller()
}

