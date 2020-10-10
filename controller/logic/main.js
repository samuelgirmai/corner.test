import inquirer from 'inquirer'

import {
  service_controller
} from './service/main';

import {
  client_controller
} from './client/main';

import {
  person_controller
} from './person/main';

import {
  get_admin 
} from './admin/admin.js'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['service', 'client', 'person', 'admin', 'exit']
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
    case 'person':
      await person_controller();
      break;
    case 'admin':
      await get_admin();
      break;
    case 'exit':
      process.exit();
  }
}

controller_start();
