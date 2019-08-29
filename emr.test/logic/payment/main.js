import inquirer from 'inquirer'

import {
  get_price,
  create_payment
} from './payment';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Payment Test App',
    choices: ['get.price', 'create.payment', '<<back']
  }
];

export async function payment_start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'get.price':
      await get_price(token);
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

