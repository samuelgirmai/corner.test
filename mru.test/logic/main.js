import inquirer from 'inquirer'

import {
  signin,
  signout,
  create_user,
  read_user,
  read_idata,
  create_idata,
} from './infotics';

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
      await create_user();
      break;
    case 'read.cofficer':
      await read_user(token);
      break;
    case 'create.patient':
      await create_idata(token);
      break;
    case 'read.patient':
      await read_idata(token);
      break;
  }
   _start();
}
_start();

