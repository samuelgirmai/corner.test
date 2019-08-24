import API from '../../api/api_rest';
import CONFIG from '../../config/config'

export async function get_license()
{
  return CONFIG.auth.license
}

export async function create_patient(arg)
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
  ret = await API.run(data, '/app/emr/mru/patient/write');

  //console.log("@create_patient: "+JSON.stringify(ret, 0, '  '));
     
  return ret.status == "ok"? ret.result.patient.mrn: null;
}

export async function get_patient(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.mrn
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/read');

  //console.log("@get_patient: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.result.patient: null;
}

export async function renew_pcard(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.mrn
    }
  }

  ret =  await API.run(data, '/app/emr/mru/patient/card/write');

  //console.log("@renew_pcard: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.status: null;
}

export async function print_pcard(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      card_id: arg.card_id
    }
  }

  ret = await API.run(data, '/app/emr/mru/patient/card/print');

  //console.log("@print_pcard: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.status: null;
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
  
  ret = await API.run(data, '/app/emr/mru/user/write');

  //console.log("@create_user: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.result.user.user_id: null;
}

export async function get_user(arg)
{
  let data, ret;

  if(!arg.user_id)
    return;

  data = {
    auth: {
      license: arg.license
    },
    param: {
      user_id: arg.user_id
    }
  }

  ret =  await API.run(data, '/app/emr/mru/user/read');

  //console.log("@get_user: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.result.user: null;
}

export async function change_security(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license
    },
    param: {
      security: {
        password: arg.password
      }
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/security/write');

  //console.log("@change_security: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.status: null;
}

export async function signin(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      username: arg.username,
      password: arg.password,
    }
  }

  ret = {}//await API.run(data, '/app/emr/mru/user/access/write');

  //console.log("@signin: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.result.token: null;
}

export async function signout(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      token: arg.token
    }
  }

  ret = await API.run(data, '/app/emr/mru/user/access/delete');

  //console.log("@signout: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.status: null;
}


export async function get_stats(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      type: "cards_status",
      args: {
        type: "all",
      }
    }
  }

  ret = await API.run(data, '/app/emr/mru/stats/read');

  //console.log("@get_stats: "+JSON.stringify(ret, 0, '  '));

  return ret.status == "ok"? ret.result.stats: null;
}

const MRU = {
  get_license:		get_license,
  create_cofficer:      create_user,
  get_cofficer:         get_user,
  signin_cofficer:      signin,
  create_patient:	create_patient,
  get_patient:		get_patient,
  get_stats:		get_stats
}

export default MRU;
