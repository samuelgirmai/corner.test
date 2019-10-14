import inquirer from 'inquirer'

import {
  modify_state,
  get_info
} from './controller';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['modify_state', 'get_info', '<<back']
  }
];

export async function controller_start()
{

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'modify_state':
      await modify_state();
      break;
    case 'get_info':
      await get_info();
      break;
    case '<<back':
      return;
  }

  controller_start();
}

controller_start();
