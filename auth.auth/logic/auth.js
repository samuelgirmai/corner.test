import inquirer from 'inquirer';
import API from '../api/api_rest';
import CONFIG from '../config/config'

function _print(o, key) {
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  console.log(JSON.stringify(o.result[key], 0, '  '));
}

export async function create_service()
{
  let ret;

  let u = {
    name: "test.service",
    desc: "test service",
    host: "127.0.0.1:5560",
    address: {
      phone_number: "0911",
      email: "test.service@bokri.xyz"
    }
  }

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE,
      sii: u
    }
  }

  ret = await API.run(data, '/users/service/write');

  _print(ret, 'user_id');
}

/*export async function create_person()
{
  let ret;

  let u = {
    name: "Berhane",
    fname: "Hagos",
    mname: "Zimam",
    mfname: "Zemzem",
    gender: "M",
    dob: "12/12/12",
    address: {
      region: "Tigray",
      zone: "Debub",
      woreda: "Mekoni",
      house_no: "121",
      phone_number: "0944"
    }
  }

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE,
      pii: u
    }
  }

  ret = await API.run(data, '/users/persons/write');
  
  _print(ret, '');
}*/

export async function list_services()
{
  let ret;

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/users/services/list');

  _print(ret, 'services');
}

export async function list_clients()
{
  let ret;

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/users/clients/list');

  _print(ret, 'clients');
}

export async function list_caps()
{
  let ret;

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/caps/list');

  _print(ret, 'caps');
}

export async function list_maps()
{
  let ret;

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE
    }
  }

  ret = await API.run(data, '/maps/list');

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
      app_key: CONFIG.C_LICENSE,
      uid: p.uid,
      caps: [p.cap_id]
    }
  }

  ret = await API.run(data, '/caps/allow');

  console.log(JSON.stringify(ret, 0, '  '));
}

export async function revoke_caps(caps)
{
  let ret, p;
  
  p = await inquirer.prompt(caps_prompt);

  let data = {
    auth: {
      app_key: CONFIG.C_LICENSE,
      uid: p.uid,
      caps: [p.cap_id]
    }
  }

  ret = await API.run(data, '/caps/revoke');

  console.log(JSON.stringify(ret, 0, '  '));
}

