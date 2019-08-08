import API from '../../api/api_rest';
import CONFIG from '../../config/config'
import _ from 'lodash';

export async function get_license()
{
  return CONFIG.auth.license
}

export async function get_userType()
{
  let user_types=["informatics", "practitioner", "pharmacist", "cofficer", "laboratory", "triage"];

  return   _.sample(user_types)
}

export async function create_user(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      pii: arg.pii,
      user_type: arg.user_type
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/write');

  console.log(ret);

  return (ret.status === 'ok')? ret.result.user.user_id: null
}

export async function list_users(arg)
{
  let ret, data;;

  data = {
    auth: {
      license: arg.license,
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/list');

  return (ret.status === 'ok')? ret.result.users: null
}

export async function assign_role(arg)
{
  let data, ret;
 
  if(!arg.user_id) 
     return null;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      user_id: arg.user_id,
      user_type: arg.user_type
    }

  }

  ret = await API.run(data, '/app/emr/admin/user/role/write');

  return (ret.status == 'err')? null: ret.result.user_id;
}

export async function revoke_role(arg)
{
  let data, ret;

  data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      user_id: arg.user_id,
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/role/delete');

  //console.log(ret);
  return (ret.status == 'err')? null: ret.result.user_id;
}

export async function get_role(arg)
{
  let data, ret;

  if(!arg.user_id)
    return null;


  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id,
    }
  }

  ret = await API.run(data, '/app/emr/admin/user/role/read');

  console.log('Role: ', ret);

  return ret.status
}

export async function get_stats(arg)
{
  let ret;

  let data = {
    auth: {
      license: arg.license,
    }
  }

  ret = await API.run(data, '/app/emr/admin/stats/read');

  return (ret.status == 'err')? null: ret.result.user_id;
}
  
const ADMIN = {
  get_userType: 	get_userType,
  get_license:          get_license,
  create_user:          create_user,
  assign_role:          assign_role,
  get_role:             get_role
}

export default ADMIN;
