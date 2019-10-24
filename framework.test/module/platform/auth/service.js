import API from '../api/api_rest';
import CONFIG from '../config/config'
import {services} from '../config/services';
import _ from 'lodash';

var fs = require('fs');
var index = 0;

let CONF_DIR = '../../corner.backend/'

export async function get_license()
{
  return CONFIG.auth.license
}

export async function get_sii()
{
  return services[index]? services[index].sii: null;
}

export function get_config(arg)
{
  let conf, sname;
  let subdir = 'platform/'

  if(!arg.sii)
    return null;

  if(arg.sii.name == 'p.stream.core')
    return 'ignore';

  sname = arg.sii.name.split('.', 2);

  if(sname[0] === 'emr')
    subdir = 'services/emr/';

  conf = CONF_DIR + subdir + sname[1]+'/config/config.json'
  
  return conf;
}

export async function create_service(arg)
{
  let data, ret;

  if(!arg || !arg.sii)
    return null;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      sii: arg.sii
    }
  }

  ret = await API.run(data, '/platform/auth/users/service/write');

  console.log(JSON.stringify(ret, 0, '  '));
   
  return ret.status == "ok"? ret.result.user_id: null;
}

export async function get_service(arg)
{
  let data, ret, s;

  if(!arg)
    return null;
 
  data = {
    auth: {
      license: arg.license,
    },
  }

  ret = await API.run(data, '/platform/auth/users/services/list');

  if(ret.status === 'err')
    return null;

  s =  _.filter(ret.result.services, (o) => {
    return (arg.user_id === o.user_id)
  });

  if(!s.length)
    return null;

  return s[0];
}

/* update service's  license and user_id 
 * configuration wih in {SERVICE_PATH}/config/config
 */
export async function update_config(arg)
{ 
  let s = [], conf, buf;

  if(!arg || !arg.service)
    return null;

  if(fs.existsSync(arg.conf))
  {
    buf = JSON.parse(fs.readFileSync(arg.conf, 'utf8'));

    if(buf.auth){
      buf.auth.license = arg.service.license;
      buf.auth.service_id = arg.service.user_id;
    }

    fs.writeFileSync(arg.conf, JSON.stringify(buf, 0, '  '), 'utf8');

    console.log('[INFO]: Waiting until nodemon restarts the server.....')
    await new Promise(done => setTimeout(done, 3000));
  }
  return true;
}

export function get_allowedCaps()
{
  return services[index]? services[index].caps: null;
}

/*FIXME: increment service config index */
export function next_srv()
{
  index++;
  return true;
}

const SRV = {
  get_license:		get_license,
  create_service:       create_service,
  get_service:          get_service,
  get_sii:          	get_sii,
  get_config:           get_config,
  update_config:        update_config,
  //
  get_allowedCaps:      get_allowedCaps,
  next_srv:             next_srv,
}

export default SRV;
