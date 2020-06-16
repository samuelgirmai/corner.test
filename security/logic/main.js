import inquirer from 'inquirer';

import {
  issue_license,
  renew_license,
  revoke_license,
  refresh_token
} from './security';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'CORNER: Security Management App',
    choices: ['Issue license', 'Renew license', 'Revoke license', 'Refresh token', 'Exit']
  }
];

async function issue_ui()
{
  const issue_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(issue_prompt);

  return await issue_license(main);
}

async function renew_ui()
{
  const renew_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(renew_prompt);

  return await renew_license(main);
}

async function revoke_ui()
{
  const revoke_prompt = [
    {
      name: 'main',
      message: 'Enter User ID: ',
    }
  ];

  let { main } = await inquirer.prompt(revoke_prompt);

  return await revoke_license(main);
}

async function refresh_ui()
{
  const refresh_prompt = [
    {
      name: 'main',
      message: 'Enter Token: ',
    }
  ];

  let { main } = await inquirer.prompt(refresh_prompt);

  return await refresh_token(main);
}

async function _start()
{
  var token, ret;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'Issue license':
      ret = await issue_ui();
      break;
    case 'Renew license':
      ret = await renew_ui();
      break;
    case 'Revoke license':
      ret = await revoke_ui();
      break;
    case 'Refresh token':
      ret = await refresh_ui();
      break;
  }
  if(ret){
    main_propmt.default = 'Exit';
  }

  _start();
}
_start();
