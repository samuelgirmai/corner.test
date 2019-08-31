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

  ret = await API.run(data, '/app/emr/infotics/user/write');

  return ret.status == "ok"?ret.result.user.user_id: null;
}

export async function get_user(arg)
{
  let ret, data;
  
  if(!arg.user_id)
    return null
 
  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/read');

  return ret.status == 'ok'?ret.result.user: null;
}

export async function change_security(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license
    },
    param: {
      token: arg.token,
      password: arg.password
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/security/write');

  return ret.status == 'ok'? ret.status: null
}

export async function signin(arg)
{
  let ret, data;
 
  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      username: arg.username,
      password: arg.password,
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/access/write');
  
  return ret.status == 'ok'?ret.result.token: null;
}

export async function signout(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      token: arg.token
    }
  }

  ret = await API.run(data, '/app/emr/infotics/user/access/delete');

  return ret.status == 'ok'?ret.status: null;
}

export async function create_idata(arg)
{
  let ret, data;

  let drug = {
    name: 'paracetamol'
  }

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      type: 'drug',
      data: drug
    }
  }

  ret = await API.run(data, '/app/emr/infotics/idata/write');

  console.log(ret)

  return ret.status == "ok"?ret.result.iid:null;
}

export async function get_idata(arg)
{
  let ret, data;
  
  if(!arg.iid)
    return null;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      type: 'drug',
      iid: arg.iid
    }
  }

  ret = await API.run(data, '/app/emr/infotics/idata/read');

  return ret.status == 'ok'? ret.status.result: null;
}
const INF = {
  create_informatics:    create_user,
  get_informatics:       get_user,
  signin_informatics:    signin,
  create_idata:          create_idata,
  get_idata:             get_idata,
  get_license:           get_license
}

export default INF;

