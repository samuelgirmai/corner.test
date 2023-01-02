import inquirer from 'inquirer'

import {
  assert_payment,
  create_order,
  create_payment,
  settle_account,
  list_drivers
} from './payment';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Payment Test App',
    choices: ['list.drivers', 'assert.payment', 'create.order', 'create.payment', 'settle.account','<<back']
  }
];

export async function payment_start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'list.drivers':
      await list_drivers();
      break;
    case 'assert.payment':
      await assert_payment();
      break;
    case 'create.order':
      await create_order();
      break;
    case 'create.payment':
      await create_payment();
      break;
    case 'settle.account':
      await settle_account();
      break;
    case '<<back':
      return;
  }

  payment_start();
}

payment_start();

