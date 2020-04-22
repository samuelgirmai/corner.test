import API from '../../tools/net';
import CONFIG from './config/config'
import moment from 'moment';
import LxSTORE from './store'

var offline = true;

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


export async function signin()
{
  let ret;
 
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: "942661",
      password: "toor",
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/app/covid/mru/user/access/write');
  
  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}

export async function create_patient(token)
{
  let ret, u, route, item;

  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  u = {
    name: "Patient",
    fname: "Belay",
    gfname: "Girma",
    gender: "M",
    dob: "12/12/2012",
    nationalty: "Ethiopian",
    address: {
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }

  route = {
    origin_addr: {
      country: "Ethiopia",
      region: "oromia",
      town: "adama"
    },
    final_addr: {
      destination: "Mekelle"
    }
  }
   
  let data = {
    auth: {
      token: token,
    }, 
    param: {
      pii: u,
      route: route,
      checkpoint: 'Humera'
    }
  }

  if(!offline){
    ret = await API.run(data, CONFIG.proxy.url, '/app/covid/mru/patient/write');

    _print(ret, null);
  }
  else {
    let r = LxSTORE.write(data, "/app/covid/mru/patient/write");

    if(!r){
      console.log("Error: write_store");
    }
  }
}

export async function open_store()
{
  let r = await LxSTORE.open("disk_fs");

  if(!r){
    console.log("Error: open_store");
  }

}

export async function read_store()
{
  let r = await LxSTORE.read(0);

  if(!r){
    console.log("Error: read_store");

    return;
  }

  console.log(JSON.stringify(r, 0, '  '));
}

export async function sync_store()
{
  let r = await LxSTORE.sync();

  if(!r){
    console.log("Error: sync_store ", r);

    return;
  }

  console.log(JSON.stringify(r, 0, '  '));
}

export async function close_store()
{
  let r = await LxSTORE.close();

  if(!r){
    console.log("Error: close_store");
  }
}

