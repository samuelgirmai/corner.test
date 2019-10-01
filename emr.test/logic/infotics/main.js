import inquirer from 'inquirer'

import {
  signin,
  signout,
  change_passwd,
  create_user,
  get_user,
  list_users,
  read_idata,
  create_idata,
  list_idata
} from './infotics';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'informatics test app',
    choices: ['signin', 'signout', 'change.passwd', 'create.user', 'get.user', 'list.users','create.idata', 'read.idata', 'list.idata', '<<back']
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
    case 'get.user':
      await get_user();
      break;
    case 'list.users':
      await list_users();
      break;
    case 'create.idata':
      await create_idata(token);
      break;
    case 'read.idata':
      await read_idata(token);
      break;
    case 'list.idata':
      await list_idata(token);
      break;
    case '<<back':
      return;
  }

  infotics_start();
}
infotics_start();

