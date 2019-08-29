import inquirer from 'inquirer'

import {
  mru_start,
} from './mru/main'

import {
  practner_start,
} from './practner/main';

import {
  infotics_start,
} from './infotics/main';

import {
  triage_start
} from './triage/main';

import {
  lab_start
} from './lab/main';

import {
  pharmacy_start
} from './pharmacy/main';

import {
  finance_start
} from './finance/main';

import {
  payment_start
} from './payment/main';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'EMR Test application',
    choices: ['MRU', 'Triage', 'Practitioner', 'Laboratory', 'Informatics', 'Pharmacy', 'Finance', 'Payment', 'Exit']
  }
];

async function _start()
{
  var token, ret;

  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    case 'MRU':
      ret = await mru_start();
      break;
    case 'Practitioner':
      ret = await practner_start();
      break;
    case 'Informatics':
      ret = await infotics_start();
      break;
    case 'Triage':
      ret = await triage_start();
      break;
    case 'Laboratory':
      ret = await lab_start();
      break;
    case 'Pharmacy':
      ret = await pharmacy_start();
      break;
    case 'Finance':
      ret = await finance_start();
      break;
    case 'Payment':
      ret = await payment_start();
      break;
    case 'Exit':
      process.exit();
      break;
  }
   if(ret)
      main_propmt.default = 'Exit';
   _start();
}
_start();

