import inquirer from 'inquirer'

import {
  admin_start
} from './admin/main';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'CORNER admin application',
    choices: ['Admin', 'Exit']
  }
];

async function _start()
{
  var token, ret;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'Admin':
      ret = await admin_start();
      break;
    case 'Exit':
      process.exit();
      break;
  }

  if(ret){
    main_propmt.default = 'Exit';
  }

   _start();
}

_start();

