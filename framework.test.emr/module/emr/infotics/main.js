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
    message: 'informatics test app',
    choices: ['signin', 'signout', 'create.user', 'read.user', 'create.idata', 'read.idata', '<<back']
  }
];

export async function infotics_start()
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
    case 'create.user':
      await create_user();
      break;
    case 'read.user':
      await read_user(token);
      break;
    case 'create.idata':
      await create_idata(token);
      break;
    case 'read.idata':
      await read_idata(token);
      break;
    case '<<back':
      return;
  }
   infotics_start();
}
   infotics_start();

