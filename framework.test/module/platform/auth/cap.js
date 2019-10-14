import API from '../api/api_rest';
import CONFIG from '../config/config'
import _ from 'lodash';

let CAP_DIR = '../../../../../corner.backend/'

export async function get_license()
{
  return CONFIG.auth.license
}

function get_capFile(sii)
{
  let cap_file, sname;
  let subdir = 'platform/'

  if(!sii || sii.name == 'p.stream.core')
    return null;

  sname = sii.name.split('.', 2);

  if(sname[0] === 'emr')
    subdir = 'services/emr/';

  cap_file = CAP_DIR + subdir + sname[1]+'/caps'

  return cap_file;
}

export function get_expCaps(arg)
{
  let file, r;

  if(!arg.sii)
    return null;

  file = get_capFile(arg.sii)
  if(!file)
    return [];

  r = require(file);
  
  return r?r.caps:null;
}

export async function export_caps(arg)
{
  let data, ret;

  if(!arg.caps)
    return null;
  
  if(!arg.caps.length)
   return arg.user_id

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      service_id: arg.user_id,
      caps: arg.caps
    }
  }

  ret =  await API.run(data, '/platform/auth/caps/export');

  console.log(JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? arg.user_id: null;
}

export async function allow_caps(arg)
{
  let data, ret;

  if(!arg || !arg.user_id)
    return null;

  if(!arg.caps.length)
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

async function get_capId(arg)
{
  let r, cap_ids, data;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
  }

  r = await API.run(data, '/platform/auth/caps/list');

  if(r.status == 'err'){
   return null;
  }

  if(!arg.caps.length)
    return []

  cap_ids = find_capid(r.result.caps, arg.caps);

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

const CAP = {
  get_license:		get_license,
  allow_caps:           allow_caps,
  export_caps:   	export_caps,
  get_expCaps: 		get_expCaps,
  get_capId:		get_capId,
}

export default CAP;
