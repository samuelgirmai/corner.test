import inquirer from 'inquirer';

import S from './scanner';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Scanner Test',
    choices: ['scan', 'asset', 'upload', 'Exit']
  }
];

async function scan_fingerprint()
{
  const fp_prompt = [
    {
      name: 'user_id',
      message: 'User ID: '
    },
    /*{
      name: 'photo',
      message: 'Enter Absolute Photo Path'
    }*/
  ];

  let p = await inquirer.prompt(fp_prompt);

  return await S.scan_fingerprint(p.user_id);
}

async function get_scan()
{
  const fp_prompt = [
    {
      name: 'type',
      message: 'Asset Type [image, feature]'
    },
    {
      name: 'user_id',
      message: 'User ID: '
    }
  ];

  let p = await inquirer.prompt(fp_prompt);

  return await S.get_scan(p.type, p.user_id);
}

async function _start()
{
  var ret;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'scan':
      await scan_fingerprint();
      break;
    case 'asset':
      await get_scan();
      break;
  }

  if(ret){
    main_propmt.default = 'Exit';
  }

  _start();
}

_start();
