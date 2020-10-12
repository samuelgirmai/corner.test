import {
  controller_start
} from '../main'

import {
  read_license,
  read_password
} from '../tools'


export async function get_admin(name)
{
  let c = await read_license("corner.client.admin");

  let p = await read_password("corner.person.admin");

  console.log(JSON.stringify({
    license:  c.status == "ok"?c.result.linfo.license:null,
    username: p.status == "ok"?p.result.pinfo.user_id:null,
    password: p.status == "ok"?p.result.pinfo.password:null
  }, 0, '  '));

  controller_start();
}

