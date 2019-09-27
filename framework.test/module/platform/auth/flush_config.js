import API from '../api/api_rest';

var fs = require('fs');

export function get_config_path(arg)
{
  let sname;

  if(arg.name == 'p.stream.core')
    return 'ignore';

  sname = arg.name.split('.', 2);

  if(sname[0] === 'emr'){
    return '../../corner.backend/services/emr/'+sname[1]+'/config/config.js';
  }
  else {
    return '../../corner.backend/platform/'+sname[0]+'/config/config.js';
  }
}

export async function get_services()
{
  let data, ret, s;

  data = {
    auth: {
      /*license of auth client*/
      license: "508026275640"
    },
  }

  ret = await API.run(data, '/platform/auth/users/services/list');

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
export async function update_config(arg)
{ 
  let conf, buf;

  let s = await get_services();

  for(let i=0; i<s.length; i++) {
    conf = get_config_path(s[i]);

    //console.log(JSON.stringify(s[i], 0, '  '));

    if(fs.existsSync(conf))
    {
      buf = fs.readFileSync(conf, 'utf8');
      buf = buf.replace(/license: .*/gm, 'license: '+ '"' + s[i].license + '"' + ',');
      buf =  buf.replace(/service_id: .*/gm, 'service_id: ' + '"' + s[i].user_id+ '"' +',');
      fs.writeFileSync(conf ,buf, 'utf8');
    }
  }

  console.log('[INFO]: Waiting until nodemon restarts the server.....')
  await new Promise(done => setTimeout(done, 3000));

  return true;
}

const SRV = {
  update_config:        update_config,
}

export default SRV;
