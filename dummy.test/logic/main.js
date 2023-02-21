import inquirer from 'inquirer';

import D from './dummy';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Dummy Service Test',
    choices: ['signin', 'signout', 'change_passwd', 'get_data', 'create_data', 'modify_data', 'remove_data', 'list_data']
  }
];

var token = null;

class Data {
  subdata = "CREATED DATA";
};

async function create_data()
{
  let data1 = new Data();

  return await D.create_data(token, data1);
}

async function modify_data()
{
  const data_prompt = [
    {
      name: 'data_id',
      message: 'Enter DataID: '
    },
    {
      name: 'subdata',
      message: 'Enter Data'
    }
  ];

  let p = await inquirer.prompt(data_prompt);

  let data1 = new Data();

  data1.subdata = p.subdata;

  return await D.modify_data(token, p.data_id, data1);
}

async function get_data()
{
  const data_prompt = [
    {
      name: 'data_id',
      message: 'Enter DataID: '
    }
  ];

  let p = await inquirer.prompt(data_prompt);

  return await D.get_data(token, p.data_id);
}

async function remove_data()
{
  const data_prompt = [
    {
      name: 'data_id',
      message: 'Enter DataID: '
    }
  ];

  let p = await inquirer.prompt(data_prompt);

  return await D.remove_data(token, p.data_id);
}

async function list_data()
{
  return await D.list_data(token);
}

async function signin()
{
  let p = {username: '065892930', password: 'root'}
  
  return await D.signin(p);
}

async function change_passwd()
{
  const passwd_prompt = [
    {
      name: 'username',
      message: 'Enter Username: '
    },
    {
      name: 'oldpassword',
      message: 'Enter Current Password: '
    },
    {
      name: 'newpassword',
      message: 'Enter New Password: '
    }
  ];

  let p = await inquirer.prompt(passwd_prompt);

  return await D.change_passwd(token, p);
}

async function _start()
{
  var ret;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'signin':
      token = await signin();
      break;
    case 'signout':
      await D.signout(token);
      break;
    case 'change_passwd':
      await change_passwd();
      break;
    case 'create_data':
      await create_data();
      break;
    case 'get_data':
      await get_data();
      break;
    case 'modify_data':
      await modify_data();
      break;
    case 'remove_data':
      await remove_data();
      break;
    case 'list_data':
      await list_data();
      break;
  }

  if(ret) {
    main_propmt.default = 'Exit';
  }

  _start();
}

_start();
