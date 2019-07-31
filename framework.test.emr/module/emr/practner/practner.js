import API from '../../api/api_rest';
import CONFIG from '../../config/config'

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

  return ret.status == "ok"?ret.result: null;
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
      username: arg.username,
      password: arg.password,
    }
  }

  ret = {}//await API.run(data, '/app/emr/practner/user/access/write');
 
  return ret; 
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
  
  return ret;
}

export async function create_precord(arg)
{
  let data, rec, ret;

  console.log("arg: ", arg);

  if(!arg.mrn)
    return null;

  rec = {
    dialog: {
      chief_complaint: 'non stop headache',
      visit_repeat: 'false',
      drug: ['111', '222'],
      symptom: 'test symptom',
      remark: 'test remark'
    },
    lab: ['71', '24', '32', '40'],
    ncod: ['25', '51', '10', '21', '23'],
    drug: ['13', '23', '43', '12']
  }

  data = {
    auth: {
      license: arg.license,
    }, 
    param: {
      mrn: arg.mrn,
      rec: rec
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/write');

  return ret.status == "ok"?{rid: ret.result.rid, mrn: arg.mrn}: null
}

export async function read_precord(arg)
{
  let ret, data;

  data = {
   auth: {
      license: CONFIG.auth.license,
    },
    param: {
      mrn: arg.mrn,
      rid: arg.rid
    }
  }

  ret = await API.run(data, '/app/emr/practner/patient/record/read');

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

  return ret;
}

const PRT = {
  create_practitioner:    create_user,
  get_practitioner:       get_user,
  signin_practitioner:    signin,
  create_precord:         create_precord,
  read_precord:           read_precord,
}

export default PRT;
