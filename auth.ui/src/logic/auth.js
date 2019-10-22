//import inquirer from 'inquirer';
import API from 'api/net';
import CONFIG from 'config/config'
import STORE from 'store/main';


function _print(o, key) 
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }

  console.log(JSON.stringify(o, 0, '  '));
}

export async function create_service(u)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      sii: u
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/service/write');

  _print(ret, null);

  return ret;
}

export async function create_client(u)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      cii: u
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/client/write');

  _print(ret, null);

  return ret;
}

export async function create_person(u)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      pii: u
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/person/write');
  
  _print(ret, null);

  return ret;
}

export async function list_logs()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/log/access/read');

  if(ret.status == "ok"){
    STORE.write('logs', ret.result.logs);
  }

  _print(ret, 'logs');

  return ret;
}

export async function list_services()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/services/list');

  if(ret.status == "ok"){
    STORE.write('services', ret.result.services);
  }

  _print(ret, 'services');

  return ret;
}

export async function list_clients()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/clients/list');

  if(ret.status == "ok"){
    STORE.write('clients', ret.result.clients);
  }

  _print(ret, 'clients');

  return ret;
}

export async function list_persons()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    /*param: {
      pagin: {
        page_num: 1,
        size: 20,
      }
    }*/
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/persons/list');

  if(ret.status == "ok"){
    STORE.write('persons', ret.result.persons);
  }

  _print(ret, 'persons');

  return ret;
}

export async function remove_person(uid)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      uid: uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/person/delete');

  _print(ret, 'allowed_caps');

  return ret;
}

export async function remove_client(uid)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      uid: uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/client/delete');

  _print(ret, 'allowed_caps');

  return ret;
}

export async function remove_service(uid)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      uid: uid
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/service/delete');

  _print(ret, 'allowed_caps');

  return ret;
}

export async function get_heartbeat()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {}
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/users/services/state/read');

  _print(ret, 'state');

  return ret;
}

export async function list_caps()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      sid: null,
      catagory: null,
      /*pagin: {
        page_num: 1,
        size: 20,
        order_by: 'asc'
      }*/
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/caps/list');

  if(ret.status == "ok"){
    STORE.write('caps', ret.result.caps);
  }

  _print(ret, 'caps');

  return ret;
}

export async function remove_cap(service_id, cap_id)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      service_id: service_id,
      cap_id: cap_id
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/caps/delete');

  /*if(ret.status == "ok"){
    STORE.del('caps', {service_id: service_id, cap_id: cap_id});
  }*/

  _print(ret, 'caps');

  return ret;
}

export async function list_maps()
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/maps/list');

  _print(ret, 'maps');

  return ret;
}

export async function allow_caps(uid, caps)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      uid: uid,
      caps: caps
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/caps/allow');

  _print(ret, 'allowed_caps');

  return ret;
}

export async function revoke_caps(uid, caps)
{
  let ret, p;
  
  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      uid: uid,
      caps: caps
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/caps/revoke');

  _print(ret, 'revoked_caps');

  return ret;
}

export async function get_stats(type, args)
{
  let ret;

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      type: type,
      args: args
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/stats/read');

  if(ret.status == "ok"){
    STORE.write('stats', ret.result.stats);
  }

  _print(ret, 'persons');

  return ret;
}

const AUTH =  {
  create_service:	create_service,
  create_client:	create_client,
  create_person:	create_person,
  remove_person:	remove_person,
  remove_client:	remove_client,
  remove_service:	remove_service,
  get_heartbeat: 	get_heartbeat,
  list_services:	list_services,
  list_clients:		list_clients,
  list_persons:		list_persons,
  list_caps:		list_caps,
  remove_cap:		remove_cap,
  list_maps:		list_maps,
  allow_caps:		allow_caps,
  revoke_caps:		revoke_caps,
  list_logs:		list_logs,
  get_stats:		get_stats
};

export default AUTH;

