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

  ret = await API.run(data, '/app/rufta/triage/user/write');

 console.log(ret)

  return ret.status == "ok"?ret.result.user.user_id: null;
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

  ret = await API.run(data, '/app/rufta/triage/user/read');

  return ret.status == "ok"?ret.result: null;
}

export async function change_security(arg)
{
  let data, ret;

  data = {
    auth: {
      token: arg.token,
    },
    param: {
      token: arg.token,
      password: arg.password
    }
  }

  ret = await API.run(data, '/app/rufta/triage/user/security/write');

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

  ret = await API.run(data, '/app/rufta/triage/user/access/write');
  
  return ret;
}

export async function signout(arg)
{
  let ret;

  let data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id,
      token: arg.token
    }
  }

  ret = await API.run(data, '/app/rufta/triage/user/access/delete');

  return ret;
}

export async function create_assign(arg)
{
  let ret, data;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.mrn,
      status: 'Blue',
      opd_id: arg.opd_id
    }
  }

  ret = await API.run(data, '/app/rufta/triage/assign/write');
console.log(ret)
  return ret.status == "ok"?ret.result.tid: null;
}

export async function update_assign(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      tid: arg.rid,
      status: 2,
      assign: {
        catagory: 'BLUE',
        dept_id: '133133'
      }
    }
  }

  ret = await API.run(data, '/app/rufta/triage/assign/update');

  return ret;
}

export async function update_status(arg)
{
  let ret, data;

  data = {
   auth: {
      license: arg.license,
    },
    param: {
      tid: arg.tid,
      status: 2
    }
  }

  ret = await API.run(data, '/app/rufta/triage/assign/status/update');

  return ret;
}

export async function get_assign(arg)
{
  let ret;

  let data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      tid: arg.tid
    }
  }

  ret = await API.run(data, '/app/rufta/triage/assign/read');

  return ret;
}

export async function read_stats(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      type: "queue_length",
      args: {
        type: "daily",
        date: "21/07/2019"
      }
    }
  }

  ret = await API.run(data, '/app/rufta/triage/stats/read');

  return ret;
}

const TRI = {
  create_triage:     create_user,
  get_triage:        get_user,
  signin_triage:     signin,
  create_assign:     create_assign,
  get_assign:        get_assign,
  get_license:       get_license
}
export default TRI;

