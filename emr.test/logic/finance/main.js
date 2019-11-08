import inquirer from 'inquirer'

import {
  create_account,
  get_account,
  set_account_scheme,
  remove_account,
  create_transaction,
  create_scheme,
  list_schemes,
  remove_scheme,
  get_balance,
  create_order,
  get_order,
  modify_order,
  remove_order,
  create_invoice,
  get_invoice,
  remove_invoice,
  create_receipt,
  get_receipt
} from './finance';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Finance Test App',
    choices: ['create.account', 'get.account', 'remove.account', 'set.scheme', 'create.transaction', 'get.balance', 'create.scheme', 'list.schemes', 'remove.scheme', 'create.order', 'get.order', 'modify.order', 'remove.order','create.invoice', 'get.invoice', 'remove.invoice', 'create.receipt', 'get.receipt', '<<back']
  }
];

export async function finance_start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'create.account':
      await create_account(token);
      break;
    case 'get.account':
      await get_account(token);
      break;
    case 'set.scheme':
      await set_account_scheme(token);
      break;
    case 'remove.account':
      await remove_account(token);
      break;
    case 'create.scheme':
      await create_scheme(token);
      break;
    case 'list.schemes':
      await list_schemes(token);
      break;
    case 'remove.scheme':
      await remove_scheme(token);
      break;
    case 'create.transaction':
      await create_transaction(token);
      break;
    case 'get.balance':
      await get_balance(token);
      break;
    case 'create.order':
      await create_order(token);
      break;
    case 'get.order':
      await get_order(token);
      break;
    case 'modify.order':
      await modify_order(token);
      break;
    case 'remove.order':
      await remove_order(token);
      break;
    case 'create.invoice':
      await create_invoice(token);
      break;
    case 'get.invoice':
      await get_invoice(token);
      break;
    case 'create.receipt':
      await create_receipt(token);
      break;
    case 'get.receipt':
      await get_receipt(token);
      break;
    case '<<back':
      return;
  }

  finance_start();
}

finance_start();

