import API from '../../api/api_rest';
import CONFIG from '../../config/config'

export async function get_license()
{
  return CONFIG.auth.license
}

export async function create_user(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      pii: arg.pii
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/user/write');

  return (ret.status === 'ok')? ret.result.user.user_id: null
}

export async function get_user(arg)
{
  let ret, data;

  if(!arg.user_id)
    return null;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id
    }
  }
  ret = await API.run(data, '/app/emr/pharmacy/user/read');

  return (ret.status === 'ok')? ret.result: null
}

export async function change_security(arg)
{
  let data, ret;

  data = {
    auth: {
      token: arg.license
    },
    param: {
      token: arg.token,
      password: "121211"
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/user/security/write');

  return ret;
}

export async function signin(arg)
{
  let data, ret = {};

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      username: arg.username,
      password: arg.password,
    }
  }

  ret = {} //await API.run(data, '/app/emr/pharmacy/user/access/write');
  
  return ret;
}

export async function signout(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
  }

  ret = await API.run(data, '/app/emr/pharmacy/user/access/delete');

  return ret;
}

export async function create_dispense(arg)
{
  let data, ret;

  if(!arg.result)
    return null;

  let  dispense  = {
  
  }

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid,
      dispense: dispense
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/dispense/write');
  
  return ret.status = "ok"?ret.result.did: null;
}

export async function read_dispense(arg)
{
  let ret, data;

  if(!arg.did)
    return null;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      did: arg.did
    }
  }

  ret = await API.run(data, '/app/emr/pharmacy/dispense/read');

  return ret;
}

const PHM = {
  get_license:          get_license,
  create_pharmacist:    create_user,
  get_pharmacist:       get_user,
  signin_pharmacist:    signin,
  create_dispense:      create_dispense,
  get_dispense:         read_dispense,
}

export default PHM;
