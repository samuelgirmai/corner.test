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
  list_invoice,
  create_receipt,
  get_receipt,
  list_receipt,
  create_deposit,
  create_withdraw,
} from './finance';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Finance Test App',
    choices: ['create.account', 'get.account', 'remove.account', 'set.scheme', 'create.transaction', 'get.balance', 'create.scheme', 'list.schemes', 'remove.scheme', 'create.order', 'get.order', 'modify.order', 'remove.order','create.invoice', 'get.invoice', 'remove.invoice', 'list.invoice', 'create.receipt', 'get.receipt', 'list.receipt', 'deposit','withdraw', '<<back']
  }
];

var token = null;

export async function finance_start()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'create.account':
      await create_account();
      break;
    case 'get.account':
      await get_account();
      break;
    case 'set.scheme':
      await set_account_scheme();
      break;
    case 'remove.account':
      await remove_account();
      break;
    case 'create.scheme':
      await create_scheme();
      break;
    case 'list.schemes':
      await list_schemes();
      break;
    case 'remove.scheme':
      await remove_scheme();
      break;
    case 'create.transaction':
      await create_transaction();
      break;
    case 'get.balance':
      await get_balance();
      break;
    case 'create.order':
      await create_order();
      break;
    case 'get.order':
      await get_order();
      break;
    case 'modify.order':
      await modify_order();
      break;
    case 'remove.order':
      await remove_order();
      break;
    case 'create.invoice':
      await create_invoice();
      break;
    case 'get.invoice':
      await get_invoice();
      break;
    case 'list.invoice':
      await list_invoice();
      break;
    case 'remove.invoice':
      await remove_invoice();
      break;
    case 'create.receipt':
      await create_receipt();
      break;
    case 'get.receipt':
      await get_receipt();
      break;
    case 'list.receipt':
      await list_receipt();
      break;
    case 'deposit':
      await create_deposit();
      break;
    case 'withdraw':
     await create_withdraw();
     break;
    case '<<back':
      return;
  }

  finance_start();
}

finance_start();

