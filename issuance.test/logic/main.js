import inquirer from 'inquirer';

import A from './issuance';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Issuance Identity Management',
    choices: ['signin', 'signout', 'change_passwd', 'create_identity', 'list_identity', 'modify_identity', 'remove_identity', 'create_photo', 'modify_photo', 'get_identity', 'issue_identity', 'get_auth_identity', 'Exit']
  }
];

var token = null;

class Pii {
  name = "";
  fname = "hiluf";
  mname = "kiros";
  mfname ="gebru";
  gfname = "worota";
  gender = "F";
  dob = "12/12/1985";
  address = {
    region: "tigray",
    woreda: "hadinet",
    tabiya: "hayet",
    phone_number: "",
    house_number: "430"
    
  }
};


async function create_identity()
{
  let pii = new Pii();

  const pii_prompt = [
    {
      name: 'name',
      message: 'Enter Name: '
    },
    {
      name: 'phone_number',
      message: 'Enter Phone Number: '
    }
  ];

  let p = await inquirer.prompt(pii_prompt);

  pii.name = p.name;
  pii.address.phone_number = p.phone_number;

  //console.log(JSON.stringify(pii, 0, '  '));

  return await A.create_identity(token, pii);
}

async function modify_identity()
{
  let reg_id;
  let pii = new Pii();

  const rid_prompt = [
    {
      name: 'reg_id',
      message: 'Registration ID: '
    }
  ];

  const pii_prompt = [
    {
      name: 'name',
      message: 'Enter Name: '
    },
    {
      name: 'phone_number',
      message: 'Enter Phone Number: '
    }
  ];

  reg_id = (await inquirer.prompt(rid_prompt)).reg_id;

  let p = await inquirer.prompt(pii_prompt);

  pii.name = p.name;
  pii.address.phone_number = p.phone_number;

  //console.log(JSON.stringify(pii, 0, '  '), JSON.stringify(reg_id, 0, '  '));
  
  return await A.modify_identity(token, reg_id, pii);
}

async function create_photo()
{
  const photo_prompt = [
    {
      name: 'reg_id',
      message: 'Registration ID: '
    },
    {
      name: 'photo',
      message: 'Enter Absolute Photo Path'
    }
  ];

  let p = await inquirer.prompt(photo_prompt);

  return await A.create_photo(token, p.reg_id, p.photo);
}

async function remove_identity()
{
  let reg_id;

  const rid_prompt = [
    {
      name: 'reg_id',
      message: 'Registration ID: '
    }
  ];

  reg_id = (await inquirer.prompt(rid_prompt)).reg_id;

  //console.log(reg_id);

  return await A.remove_identity(token, reg_id);
}

async function list_identity()
{
  let state;

  const state_prompt = [
    {
      type: 'list',
      name: 'state',
      message: 'Select State',
      choices: ['PENDING', 'ISSUED']
    }
  ];

  state = (await inquirer.prompt(state_prompt)).state;

  //console.log(state);

  return await A.list_identity(token, state);
}

async function issue_identity()
{ 
  let reg_id;

  const issue_prompt = [
    {
      type: 'list',
      name: 'reg_id',
      message: 'Select Identity',
      choices: await A.get_pending(token)
    }
  ];

  reg_id = (await inquirer.prompt(issue_prompt)).reg_id;

  /*const rid_prompt = [
    {
      name: 'reg_id',
      message: 'Enter Registration ID'
    }
  ];

  reg_id = (await inquirer.prompt(rid_prompt)).reg_id;*/


  //console.log(reg_id);

  return await A.issue_identity(token, reg_id);
}

async function get_identity()
{
  let reg_id;

  const rid_prompt = [
    {
      name: 'reg_id',
      message: 'Enter Registration ID'
    }
  ];

  reg_id = (await inquirer.prompt(rid_prompt)).reg_id;

  //console.log(reg_id);

  return await A.get_identity(token, reg_id);
}

async function get_auth_identity()
{
  let user_id;

  const uid_prompt = [
    {
      name: 'user_id',
      message: 'Enter User ID'
    }
  ];

  user_id = (await inquirer.prompt(uid_prompt)).user_id;

  //console.log(user_id);

  return await A.get_auth_identity(token, user_id);
}

async function signin()
{
  const signin_prompt = [
    {
      name: 'username',
      message: 'Enter Username: '
    },
    {
      name: 'password',
      message: 'Enter Password: '
    }
  ];

  let p = await inquirer.prompt(signin_prompt);

  //console.log(JSON.stringify(p, 0, '  '));

  return await A.signin(p);
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

  //console.log(JSON.stringify(p, 0, '  '));

  return await A.change_passwd(token, p);
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
      await A.signout(token);
      break;
    case 'change_passwd':
      await change_passwd();
      break;

    case 'create_identity':
      await create_identity();
      break;
    case 'list_identity':
      await list_identity();
      break;
    case 'modify_identity':
      await modify_identity();
      break;
    case 'get_identity':
      await get_identity();
      break;
    case 'issue_identity':
      await issue_identity();
      break;
    case 'remove_identity':
      await remove_identity();
      break;
    case 'create_photo':
      await create_photo();
      break;
    case 'modify_photo':
      await modify_photo();
      break;
    case 'get_auth_identity':
      await get_auth_identity();
      break;
  }

  if(ret){
    main_propmt.default = 'Exit';
  }

  _start();
}

_start();
