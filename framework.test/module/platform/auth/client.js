import API from '../api/api_rest';
import CONFIG from '../config/config'
import {clients} from '../config/clients';
import _ from 'lodash';

var fs = require('fs');
var index = 0;

let CONF_DIR = '../emr.test/'

export async function get_license()
{
  return CONFIG.auth.license
}

export async function get_cii()
{

  return clients[index]? clients[index].cii: null;
}

export async function create_client(arg)
{
  let data, ret;

  if(!arg || !arg.cii)
    return null;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      cii: arg.cii
    }
  }

  ret = await API.run(data, '/platform/auth/users/client/write');
  
  return ret.status == "ok"? ret.result.user_id: null;
}

export async function get_client(arg)
{
  let data, ret, c;

  if(!arg) 
    return null;

  data = {
    auth: {
      license: arg.license,
    },
  }

  ret = await API.run(data, '/platform/auth/users/clients/list');

  if(ret.status === 'err')
    return null;

  c =  _.filter(ret.result.clients, (o) => {
    return (arg.user_id === o.user_id)
  });

  if(!c.length)
    return null;

  return c[0];
}


export function get_config(arg)
{

  let conf = CONF_DIR + '/config/config.js'

  return conf;
}

/* update clients's  license and user_id 
 * configuration
 */
export async function update_config(arg)
{
  let s = [], conf, buf;
  
  if(!arg || !arg.client !! !arg.conf)
    return null;
  
  if(fs.existsSync(arg.conf))
  {
    buf = fs.readFileSync(arg.conf, 'utf8')
    buf = buf.replace(/license: .*/gm, 'license: '+ '"' + arg.client.license + '"' + ',');
    fs.writeFileSync(arg.conf ,buf, 'utf8');

    console.log('[INFO]: Waiting until nodemon restarts the server.....')
    await new Promise(done => setTimeout(done, 3000));
  }
  return true;
}


const CLT = {
  get_license:		get_license,
  create_client:        create_client,
  get_client:           get_client,
  get_cii:          	get_cii,
  update_config:        update_config
}

export default CLT;
