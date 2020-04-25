import inquirer from 'inquirer'

import {
  signin,
  create_person,
  open_store,
  read_store,
  sync_store,
  close_store
} from './lxauth';

import LxSTORE from './store';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'mru (offline/sync) test',
    choices: ['signin', 'open.store', 'create.person', 'read.store', 'sync.store', 'close.store', '<<back']
  }
];

var token = null;

export async function lxmru_start()
{

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'signin':
      token = await signin();
      break;
    case 'create.person':
      await create_person(token);
      break;
    case 'open.store':
      await open_store();
      break;
    case 'read.store':
      await read_store();
      break;
    case 'sync.store':
      await sync_store();
      break;
    case 'close.store':
      await close_store();
      break;
    case '<<back':
      return;
  }

  lxmru_start();
}

lxmru_start();
