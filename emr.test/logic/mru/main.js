import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_cofficer,
  get_cofficer,
  list_cofficers,
  create_patient,
  read_patient,
  read_stats,
  renew_pcard,
  print_pcard,
  list_appointments,
  change_password,
  list_invoice,
  list_receipt,
  create_order,
  create_payment,
  settle_account,
  assert_payment
} from './mru';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signin', 'signout', 'change.passwd','create.cofficer', 'get.cofficer', 'list.cofficers','create.patient', 'read.patient', 'list.appointments', 'read.stats', 'renew.pcard', 'print.pcard', 'list.invoice','list.receipt','create.order', 'create.payment', 'settle.account', 'assert.payment','<<back']
  }
];

var token = null;
export async function mru_start()
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
      await change_password(token);
      break;
    case 'create.cofficer':
      await create_cofficer(token);
      break;
    case 'get.cofficer':
      await get_cofficer(token);
      break;
    case 'list.cofficers':
      await list_cofficers(token);
      break;
    case 'create.patient':
      await create_patient(token);
      break;
    case 'read.patient':
      await read_patient(token);
      break;
    case 'read.stats':
      await read_stats(token);
      break;
    case 'renew.pcard':
      await renew_pcard(token);
      break;
    case 'print.pcard':
      await print_pcard(token);
      break;
    case 'list.appointments':
      await list_appointments(token);
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
  mru_start();
}

mru_start();
