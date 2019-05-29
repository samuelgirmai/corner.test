import inquirer from 'inquirer'
import {
  list_services,
  list_clients,
  list_caps,
  list_maps,
  allow_caps,
  revoke_caps
} from './auth'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'auth test window',
    choices: ['list_services', 'list_clients', 'list_caps', 'list_maps', 'allow_caps', 'revoke_caps']
  }
];

async function _start()
{
  var token;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'list_services':
      await list_services();
      break;
    case 'list_clients':
      await list_clients();
      break;
    case 'list_caps':
      await list_caps();
      break;
    case 'list_maps':
      await list_maps();
      break;
    case 'create_service':
      await create_service();
      break;
    case 'create_client':
      await create_client();
      break;
    case 'create_person':
      await create_person();
      break;
    case 'export_caps':
      await export_caps(token);
      break;
    case 'allow_caps':
      await allow_caps(token);
      break;
    case 'revoke_caps':
      await revoke_caps();
      break;
  }
   _start();
}
_start();

