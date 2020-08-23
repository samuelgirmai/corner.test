import API from '../../tools/net';
import CONFIG from './config/config'

var op_types=[
    "ADD",
    'MUL'
  ]

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



 async function __create_add()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param:{
      input:[1,2.456,3,4],
      op_type:op_types[0]
    }
    
  }
 
  ret = await API.run(data, CONFIG.proxy.url, '/platform/math/add');

  _print(ret, null);

  return ret;
}

async function _create_mul(c)
{
  
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param:{
      input:[1,2.456,3,4],
      op_type:op_types[1]
    }
    
  }


  ret = await API.run(data, CONFIG.proxy.url, '/platform/math/mul');

  _print(ret, null);

  return ret;
}
async function _get_stats(c)
{
  let ret;
 

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param:{
      op_type: op_types
    }
    
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/math/stats');

  _print(ret, null);

  return ret;
}


export async function create_add()
{
  await __create_add();
}

export async function create_mul()
{
  await _create_mul();
}

export async function get_stats()
{
  await _get_stats();
}







