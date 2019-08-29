import inquirer from 'inquirer'

import {
  assert_payment,
  create_payment
} from './payment';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Payment Test App',
    choices: ['assert.payment', 'create.payment', '<<back']
  }
];

export async function payment_start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'assert.payment':
      await assert_payment(token);
      break;
    case 'create.payment':
      await create_payment(token);
      break;
    case '<<back':
      return;
  }

  payment_start();
}

payment_start();

