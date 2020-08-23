import inquirer from 'inquirer'

import {
  create_add,create_mul,get_stats
} from './math';
const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Corner mul_service application',
    choices: ['create.add','create.mul','get_stats','Exit']
  }
];


export async function root_node_start()
{
  let option = await inquirer.prompt(main_prompt);
  switch(option.main){
    
    case 'create.add':
      await create_add();
      break;
    case 'create.mul':
      await create_mul();
      break;
    case 'get_stats':
      await get_stats();
      break;
    
    case 'Exit':
     process.exit();
     
  }
  root_node_start();
}

root_node_start();

