import API from '../../api/api_rest';
import CONFIG from '../../config/config'

export async function get_license()
{
  return CONFIG.auth.license
}


export async function create_user(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      pii: arg.pii
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/write');

  return ret.status == "ok"? ret.result.user.user_id: null;
}

export async function get_user(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/read');

  return ret;
}

export async function change_security(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      token: arg.token,
      password: arg.password
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/security/update');

  return ret;
}

export async function signin(arg)
{
  let data, ret;
 
  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      user_id: arg.user_id,
      username: arg.username,
      password: arg.password,
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/access/write');
  
  return ret;
}

export async function signout(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id,
      token: arg.token
    }
  }

  ret = await API.run(data, '/app/emr/lab/user/access/delete');

  return ret;
}

export async function create_result(arg)
{
  let result, data, ret;

  if(!arg.result || !arg.result.mrn)
    return null;

  result = [
    {
      id: '250711',
      result: '200 mg/dL' //FIXME: needs a syntax
    },
    {
      id: '340191',
      result: '13.5 g/dL' //FIXME: needs a syntax
    }
  ]

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid,
      result: result
    }
  }

  ret = await API.run(data, '/app/emr/lab/result/write');

  console.log('ret: ', ret)
  return ret.status == "ok"? ret.result.lid: null;
}

export async function get_result(arg)
{
  let ret, data;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      lid: arg.lid
    }
  }

  ret = await API.run(data, '/app/emr/lab/result/read');

  return ret;
}

const LAB = {
  create_labratory:     create_user,
  get_labratory:        get_user,
  signin_labratory:     signin,
  create_result:        create_result,
  get_result:           get_result,
  get_license: 	        get_license
}

export default LAB;

