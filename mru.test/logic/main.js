import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_cofficer,
  create_patient,
  read_cofficer,
  read_patient,
  issue_pcard,
  print_pcard
} from './mru'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['signin', 'signout', 'create.cofficer', 'read.cofficer', 'create.patient', 'read.patient', 'issue.pcard', 'print.pcard']
  }
];

async function _start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signin':
      await signin();
      break;
    case 'signout':
      await signout();
      break;
    case 'create.cofficer':
      await create_cofficer(token);
      break;
    case 'read.cofficer':
      await read_cofficer(token);
      break;
    case 'create.patient':
      await create_patient(token);
      break;
    case 'read.patient':
      await read_patient(token);
      break;
    case 'issue.pcard':
      await issue_pcard(token);
      break;
    case 'print.pcard':
      await print_pcard(token);
      break;


  }
   _start();
}
_start();

