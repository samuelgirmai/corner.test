import inquirer from 'inquirer';

import D from './dedup';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Issuance Identity Management',
    choices: ['signin', 'signout', 'change_passwd', 'dedup_person']
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


async function dedup_person()
{
  let pii = new Pii();

  const p_prompt = [
    {
      name: 'name',
      message: 'Name: '
    },
    {
      name: 'atype',
      message: 'Algorithm: '
    },
    {
      name: 'ntype',
      message: 'Normalization: '
    },
    {
      name: 'depth',
      message: 'Depth: '
    }
  ];

  let p = await inquirer.prompt(p_prompt);

  let n = p.name.split(" ");

  if(p.depth == 1) {
    pii.name = n[0];
  }
  else if(p.depth == 2) {
    pii.name = n[0];
    pii.fname = n[1] ? n[1] : "";
  }

  return await D.dedup_person(token, {...pii, atype: p.atype, ntype: p.ntype, depth: p.depth});
}

async function signin()
{
  /*const signin_prompt = [
    {
      name: 'username',
      message: 'Enter Username: '
    },
    {
      name: 'password',
      message: 'Enter Password: '
    }
  ];

  let p = await inquirer.prompt(signin_prompt);*/

  let p = {username: '718629', password: 'root'}
  
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
    case 'dedup_person':
      await dedup_person();
      break;
  }

  if(ret) {
    main_propmt.default = 'Exit';
  }

  _start();
}

_start();
