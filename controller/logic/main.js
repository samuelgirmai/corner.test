import inquirer from 'inquirer'

import {
  show_service,
  service_controller,
  start_service
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
    choices: ['show services', 'install services', 'create clients', 'create admin', 'show credentials', 'start services', 'exit']
  }
];

export async function controller_start()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'show services':
      await show_service();
      break;
    case 'install services':
      await service_controller();
      break;
    case 'create clients':
      await client_controller();
      break;
    case 'create admin':
      await person_controller();
      break;
    case 'show credentials':
      await get_admin();
      break;
    case 'start services':
      await start_service();
      break;
    case 'exit':
      process.exit();
  }
}

controller_start();
