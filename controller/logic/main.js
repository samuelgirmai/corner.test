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

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['service', 'client', 'person', 'exit']
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
      console.log("\n\n>> corner/client coming soon!\n");
      controller_start();
      //await client_controller();
      break;
    case 'person':
      console.log("\n\n>> corner/person coming soon!\n");
      controller_start();
      //await person_controller();
      break;
    case 'exit':
      process.exit();
  }
}

controller_start();
