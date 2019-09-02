import API from '../api/api_rest';
import CONFIG from '../config/config'
import {services} from '../config/services';

import _ from 'lodash';

var fs = require('fs');

var service = null;
var index = 0;

let CAP_DIR = '../../../../../corner.backend/'
let CONF_DIR = '../../corner.backend/'

export async function get_license()
{
  return CONFIG.auth.license
}

export async function get_sii()
{
  service = (index < services.length)? services[index++]: null;

  return service? service.sii: null;
}

function get_path(type)
{
  let sname, path;
  let subdir = 'platform/'

  if(!service || service.sii.name == 'p.stream.core')
    return null;

  sname = service.sii.name.split('.', 2);

  if(sname[0] === 'emr')
    subdir = 'services/emr/';

  if(type == 'conf')
    return CONF_DIR + subdir + sname[1];

  return CAP_DIR + subdir + sname[1];
}

export function get_caps()
{
  let path, r;

  if(!(path = get_path()))
    return [];

  r = require(path+'/caps');
  
  return r?r.caps:null;
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
  
  return ret.status == "ok"? ret.result.user_id: null;
}

export async function list_service(arg)
{
  let data, ret;

  if(!arg)
    return null;
 
  data = {
    auth: {
      license: arg.license,
    },
  }

  ret = await API.run(data, '/platform/auth/users/services/list');

  ret.result.user_id = arg.user_id;

  return ret.status == "ok"? ret.result: null;
}

export async function export_caps(arg)
{
  let caps, data, ret;

  caps = get_caps();

  if(!caps)
    return null;
  
  if(!caps.length)
   return arg.user_id

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      service_id: arg.user_id,
      caps: caps
    }
  }

  ret =  await API.run(data, '/platform/auth/caps/export');

  return ret.status == "ok"? arg.user_id: null;
}

export async function allow_caps(arg)
{
  let data, ret, caps;

  if(!arg || !arg.user_id)
    return null;

  if(!service.caps.length)
    return arg.user_id;
 
  data = {
    auth: {
      license: arg.license,
    },
    param: {
      uid: arg.user_id,
      caps: arg.caps
    }
  }

  ret =  await API.run(data, '/platform/auth/caps/allow');

  return ret.status == "ok"? arg.user_id: null;
}

/*update service's  license and user_id configuration wih in {SERVICE_PATH}/config/config*/
export async function update_config(arg)
{ 
  let s = [], path, buf;

  if(!arg || !arg.result || !arg.result.services)
    return null;

  let data  = JSON.parse(JSON.stringify(arg));

  s =  _.filter(data.result.services, (o) => {
    return (data.result.user_id === o.user_id)
  });

  if(!s.length)
    return null;

  path = get_path('conf');

  if(path)
  {
    buf = fs.readFileSync(path+'/config/config.js', 'utf8')  
    buf = buf.replace(/license: .*/gm, 'license: '+ '"' + s[0].license + '"' + ',');
    buf =  buf.replace(/service_id: .*/gm, 'service_id: ' + '"' + data.result.user_id+ '"' +',');
    fs.writeFileSync(path+'/config/config.js',buf, 'utf8');

    console.log('[INFO]: Wating until nodemon restarts the server after confuig update.....')
    await new Promise(done => setTimeout(done, 3000));
  }
  return true;
}

async function get_capId()
{
  let r,  caps = [], cap_ids, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
  }

  r = await API.run(data, '/platform/auth/caps/list');

  if(r.status == 'err'){
   return 0;
  }

  if(!service.caps.length)
    return []

  caps = r.result.caps;

  cap_ids = find_capid(caps, service.caps);

  if(!cap_ids.length){
    return null;
  }

  return cap_ids;
}

function find_capid(p_caps, cap_headers)
{
  let cap_id = [];

  for(let i = 0; i < p_caps.length; i++)
  {
    for (let j = 0; j < cap_headers.length ; j++){
      if(_.includes(p_caps[i].uri, cap_headers[j]))
        cap_id.push(p_caps[i].cap_id);
    }
  }

  return cap_id;
}

const AUTH = {
  get_license:		get_license,
  create_service:       create_service,
  list_service:         list_service,
  get_sii:          	get_sii,
  allow_caps:           allow_caps,
  export_caps:   	export_caps,
  get_caps: 		get_caps,
  get_capId:		get_capId,
  update_config:        update_config
}

export default AUTH;
