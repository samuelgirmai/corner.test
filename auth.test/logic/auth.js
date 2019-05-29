import API from '../api/api_rest';
import CONFIG from '../config/config'

export async function signup()
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
      app_key: "106187486612",
      pii: u
    }
  }

  ret = await API.signup(data);
  
  console.log(JSON.stringify(ret, 0, '  '));
}

export async function signin()
{
  let ret;
 
  let data = {
    auth: {
      app_key: "106187486612",
      username: "986271",
      password: "33144826",
    }
  }

  ret = await API.signin(data);
  
  console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

export async function signout()
{
  let ret;

  let data = {
    auth: {
      token: "911879778733"
    }
  }

  ret = await API.signout(data);

  console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

