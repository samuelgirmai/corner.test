import inquirer from 'inquirer'

import {
  service_controller
} from './service/main';

import {
  client_controller
} from './client/main';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['service', 'client', '<<back']
  }
];

export async function controller_start()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'service':
      await service_controller();
      break;
    case 'client':
      await client_controller();
      break;
    case '<<back':
      return;
  }

  controller_start();
}

controller_start();
