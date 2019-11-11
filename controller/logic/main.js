import inquirer from 'inquirer'

import {
  configure,
  mkfs,
  install,
  allow,
  start,
  get_info
} from './controller';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['get_info', 'configure', 'mkfs', 'install', 'allow', 'start', '<<back']
  }
];

export async function controller_start()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'configure':
      await configure();
      break;
    case 'mkfs':
      await mkfs();
      break;
    case 'install':
      await install();
      break;
    case 'allow':
      await allow();
      break;
    case 'start':
      await start();
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
