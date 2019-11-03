import API from '../api/api_rest';

var fs = require('fs');

export function get_config_path(arg)
{
  let sname;

  if(arg.name == 'p.stream.core')
    return 'ignore';

  sname = arg.name.split('.', 2);
  console.log(sname)
  if(sname[0] === 'emr'){
    return '../../corner.backend/services/emr/'+sname[1]+'/config/config.json';
  }
  else {
    return '../../corner.backend/platform/'+(sname[1]?sname[1]: sname[0])+'/config/config.json';
  }
}

export async function get_services()
{
  let data, ret, s;

  data = {
    auth: {
      /*license of auth client*/
      license: "829710799429"
    },
  }

  ret = await API.run(data, '/platform/auth/users/services/list');

  console.log(JSON.stringify(ret, 0, '  '));

  if(ret.status === 'err')
    return null;

  if(!ret.result.services.length){
    return null;
  }

  return ret.result.services;
}


/* update service's  license and user_id 
 * configuration wih in {SERVICE_PATH}/config/config
 */
export async function update_license(arg)
{ 
  let conf, buf;

  let s = await get_services();

  for(let i=0; i<s.length; i++) {
    conf = get_config_path(s[i]);

    //console.log(JSON.stringify(s[i], 0, '  '));

    if(fs.existsSync(conf))
    {

      buf = JSON.parse(fs.readFileSync(conf, 'utf8'));

      if(buf.auth){      
        buf.auth.license = s[i].license;
        buf.auth.service_id = s[i].user_id;
      }
 
      //console.log(JSON.stringify(buf, 0, '  '));

      fs.writeFileSync(conf, JSON.stringify(buf, 0, '  '), 'utf8');
    }
    else if(conf === 'ignore'){
      continue;
    }
    else {
      console.log("file not found (%s)", conf);
      return false;
    }
  }

  console.log('[INFO]: Waiting until nodemon restarts the server.....')
  await new Promise(done => setTimeout(done, 3000));

  return true;
}


export async function update_config(arg)
{
  if(await update_license(arg)){
    return true;
  }

  return false;
}

const SRV = {
  update_config:        update_config,
}

export default SRV;
