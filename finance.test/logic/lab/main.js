import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
  create_user,
  get_user,
  list_users,
  create_result,
  read_result,
  list_invoice,
  list_receipt,
  create_order,
  create_payment,
  settle_account,
  assert_payment
} from './lab';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Laboratory Test App',
    choices: ['signin', 'signout', 'change.passwd', 'create.user', 'get.user', 'list.users', 'create.result', 'read.result', 'list.invoice','list.receipt', 'create.order', 'create.payment', 'settle.account', 'assert.payment','<<back']
  }
];

var token = null;

export async function lab_start()
{

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signin':
      token = await signin();
      break;
    case 'signout':
      await signout(token);
      break;
    case 'change.passwd':
      await change_passwd(token);
      break;
    case 'create.user':
      await create_user();
      break;
    case 'get.user':
      await get_user();
      break;
    case 'list.users':
      await list_users();
      break;
    case 'create.result':
      await create_result(token);
      break;
    case 'read.result':
      await read_result(token);
      break;
    case 'list.invoice':
      await list_invoice(token);
      break;
    case 'list.receipt':
      await list_receipt(token);
      break;
    case 'create.order':
      await create_order(token);
      break;
    case 'create.payment':
      await create_payment(token);
      break;
    case 'settle.account':
      await settle_account(token);
      break;
    case 'assert.payment':
      await assert_payment(token);
      break;
    case '<<back':
      return;
  }
  lab_start();
}

lab_start();

