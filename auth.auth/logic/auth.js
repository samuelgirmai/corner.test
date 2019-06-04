import inquirer from 'inquirer';
import API from '../api/api_rest';
import CONFIG from '../config/config'

function _print(o, key) 
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }

  console.log(JSON.stringify(o, 0, '  '));
}

export async function create_service()
{
  let ret;

  let u = {
    name: "mru.service",
    desc: "mru service",
    host: "127.0.0.1:5560",
    address: {
      phone_number: "0911",
      email: "mru.service@bokri.xyz"
    }
  }

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      sii: u
    }
  }

  ret = await API.run(data, '/platform/auth/users/service/write');

  _print(ret, null);
}

export async function create_client()
{
  let ret;

  let u = {
    name: "mru.client",
    desc: "mru client",
    address: {
      phone_number: "0944",
      email: "mru.client@bokri.xyz"
    }
  }

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      cii: u
    }
  }

  ret = await API.run(data, '/platform/auth/users/client/write');

  _print(ret, null);
}

export async function create_person()
{
  let ret;

  let u = {
    name: "Berhane",
    fname: "Farah",
    mname: "Zemzem",
    mfname: "Gidey",
    gender: "M",
    dob: "12/12/12",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Azebo",
      house_no: "121",
      phone_number: "0955"
    }
  }

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      pii: u
    }
  }

  ret = await API.run(data, '/platform/auth/users/person/write');
  
  _print(ret, null);
}

export async function list_services()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/platform/auth/users/services/list');

  _print(ret, 'services');
}

export async function list_clients()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/platform/auth/users/clients/list');

  _print(ret, 'clients');
}

export async function list_caps()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/platform/auth/caps/list');

  _print(ret, 'caps');
}

export async function list_maps()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/platform/auth/maps/list');

  _print(ret, 'maps');
}

const caps_prompt = [
  {
    type: 'input',
    name: 'uid',
    message: 'user id: ',
  },
  {
    type: 'input',
    name: 'cap_id',
    message: 'cap id: ',
  },
]
export async function allow_caps(caps)
{
  let ret, p;

  p = await inquirer.prompt(caps_prompt);

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      uid: p.uid,
      caps: [p.cap_id]
    }
  }

  ret = await API.run(data, '/platform/auth/caps/allow');

  _print(ret, 'allowed_caps');
}

export async function revoke_caps(caps)
{
  let ret, p;
  
  p = await inquirer.prompt(caps_prompt);

  let data = {
    auth: {
      license: CONFIG.C_LICENSE,
      uid: p.uid,
      caps: [p.cap_id]
    }
  }

  ret = await API.run(data, '/platform/auth/caps/revoke');

  _print(ret, 'revoked_caps');
}

