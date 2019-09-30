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

  ret = await API.run(data, '/app/emr/practner/user/write');

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

  ret = await API.run(data, '/app/emr/practner/user/read');

  return ret.status == "ok"?ret.result.user: null;
}

export async function change_security(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      token: arg.token,
      password: arg.password
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/security/write');

  return ret.status == "ok"?ret.result.token: null;
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

  ret = await API.run(data, '/app/emr/practner/user/access/write');
 
  return ret.status == "ok"?ret.result.token: null;
}

export async function signout(arg)
{
  let data, ret;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      user_id: arg.user_id,
      token: arg.token
    }
  }

  ret = await API.run(data, '/app/emr/practner/user/access/delete');
  
  return ret.status == "ok"?ret.status: null;
}

export async function create_precord(arg)
{
  let data, rec, ret;

  console.log("arg: ", arg);

  if(!arg.mrn)
    return null;

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      mrn: arg.mrn,
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/write');

  return ret.status == "ok"?{rid: ret.result.rid, mrn: arg.mrn}: null
}

export async function create_order(arg)
{
  let rec, ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid,
      order: {
        lab: [{id: arg.iid}]
      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/order/update');

  console.log(ret);
  return ret.status == "ok"?{rid: arg.result.rid, mrn: arg.result.mrn}: null
}

export async function create_outcome(arg)
{
  let rec, ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid,
      outcome: {
        drug: [{id: arg.iid}]
      }
    }
  }
console.log(data);

  ret = await API.run(data, '/app/emr/practner/patient/record/outcome/update');

console.log(ret);
  return ret.status == "ok"?{rid: arg.result.rid, mrn: arg.result.mrn}: null
}
export async function create_exam(arg)
{
  let rec, ret, data, exam;

  exam = {
    repeat: false,
    chief_compliant: 'headache',
    allergy: [{id: "261294"}, {id: "720952"}],
  }

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      mrn: arg.mrn,
      rid: arg.rid,
      exam: arg.exam
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/exam/update');

  return ret.status == "ok"?true: false
}

export async function get_precord(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

  return ret.status == "ok"?ret.result.record: null
}

export async function get_order(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/order/read');

  return ret.status == "ok"?{order: ret.result.order, mrn: arg.result.mrn}: null
}

export async function get_outcome(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.result.mrn,
      rid: arg.result.rid
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/outcome/read');
  console.log(ret)
  return ret.status == "ok"?{outcome: ret.result.outcome, mrn: arg.result.mrn}: null
}

export async function create_opd(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      dii: {
        catagory: 'test',
        name: 'pediatrics',
        client_license: '119891158644',
        address: {
          phone_number: "09"+Math.random().toString().slice(2,10)
        }
      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/opd/write');
  
  return ret.status == "ok"?ret.result.opd_id:null
}

export async function read_stats(arg)
{
  let ret, data;

  data = {
    auth: {
      license: arg.license,
    },
    param: {
      type: "visit_count",
      //type: "drug_count",
      //type: "ncod_count",
      //type: "lab_count"
      args: {
        type: "daily",
        date: "19/07/2019",
        did: "13"
        //nid: "51"
        //lid: "71"
      }
    }
  }

  ret = await API.run(data, '/app/emr/practner/stats/read');

  return ret.status == "ok"?ret.result.stats: null
}

const PRT = {
  create_practitioner:    create_user,
  get_practitioner:       get_user,
  signin_practitioner:    signin,
  create_precord:         create_precord,
  create_order:           create_order,
  create_outcome:         create_outcome,
  create_opd:             create_opd,
  get_precord:            get_precord,
  get_outcome:            get_outcome,
  get_order:              get_order,
  get_license:            get_license
}

export default PRT;
