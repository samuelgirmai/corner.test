import inquirer from 'inquirer'

import {
  create_user,
  remove_user,
  list_users,
  assign_role,
  revoke_role,
  get_role,
  get_stats,
  signin,
  signout
} from './admin';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'admin test window',
    choices: ['signin', 'signout', 'create.user', 'remove.user', 'list.users', 'assign.role', 'revoke.role', 'get.role', 'get.stats', 'issue.license', 'renew.license', 'refresh.token', 'revoke.license', '<<back']
  }
];

var token = null;

async function issue_license()
{
  const issue_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(issue_prompt);

  return await issue_license(token, main);
}

async function renew_license()
{
  const renew_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(renew_prompt);

  return await renew_license(token, main);
}

async function revoke_license()
{
  const revoke_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(revoke_prompt);

  return await revoke_license(token, main);
}

async function refresh_token()
{
  const refresh_prompt = [
    {
      name: 'main',
      message: 'Enter Token: ',
    }
  ];

  let { main } = await inquirer.prompt(refresh_prompt);

  return await refresh_token(token, main);
}

export async function admin_start()
{
  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'create.user':
      await create_user(token);
      break;
    case 'remove.user':
      await remove_user(token);
      break;
    case 'list.users':
     await list_users(token);
     break;
    case 'assign.role':
      await assign_role(token);
      break;
    case 'revoke.role':
      await revoke_role(token);
      break;
    case 'get.role':
      await get_role(token);
      break;
    case 'get.stats':
      await get_stats(token);;
      break;
    case 'issue.license':
      await issue_license();
      break;
    case 'renew.license':
      await renew_license();
      break;
    case 'revoke.license':
      await revoke_license();
      break;
    case 'refresh.token':
      await refresh_token();
      break;
    case 'signin':
      token = await signin();;
      break;
    case 'signout':
      await signout(token);
      break;
    case '<<back':
      return;
  }
  admin_start();
}

admin_start();
