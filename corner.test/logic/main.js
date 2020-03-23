import inquirer from 'inquirer'

import {
  finance_start
} from './finance/main';

import {
  payment_start
} from './payment/main';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'CORNER Test application',
    choices: ['Finance', 'Payment', 'Exit']
  }
];

async function _start()
{
  var token, ret;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'Finance':
      ret = await finance_start();
      break;
    case 'Payment':
      ret = await payment_start();
      break;
    case 'Exit':
      process.exit();
      break;
  }
   if(ret)
      main_propmt.default = 'Exit';
   _start();
}
_start();

