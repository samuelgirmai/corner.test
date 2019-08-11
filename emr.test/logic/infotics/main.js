import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
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
    choices: ['signin', 'signout', 'change.passwd', 'create.user', 'read.user', 'create.idata', 'read.idata', '<<back']
  }
];

var token = null;
export async function infotics_start()
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
    case 'read.user':
      await read_user();
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

