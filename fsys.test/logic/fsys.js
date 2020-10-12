import API from '../net/net'
import CONFIG from '../config/config'

function _print(o, key)
{
  console.log(JSON.stringify(o, 0, '  '));
}

export async function load_driver(name)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      name: name
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/driver/load');

  _print(ret, null);
}

export async function unload_driver(name)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      name: name
    }
  }
  
  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/driver/unload');
  
  _print(ret, null);
}

export async function list_driver()
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }
  
  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/driver/list/read');
  
  _print(ret, null);
}

export async function create_conn(name, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      name: name,
      prop: prop
    }
  }
  
  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/conn/write');
  
  _print(ret, null);

  if(ret.status == "ok"){
    return ret.result.conn_id;
  }

  return 0;
}

export async function remove_conn(conn_id)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/conn/delete');

  _print(ret, null);
}

export async function list_conn()
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {}
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/conn/list/read');

  _print(ret, null);
}

export async function create_fs(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/fs/write');

  _print(ret, null);
}

export async function remove_fs(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/fs/delete');

  _print(ret, null);
}

export async function create_dir(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/dir/write');

  _print(ret, null);
}

export async function remove_dir(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/dir/delete');

  _print(ret, null);
}

export async function create_file(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/file/write');

  _print(ret, null);
}
    
export async function remove_file(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/file/delete');

  _print(ret, null);
}

export async function create_index(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/index/write');

  _print(ret, null);
}

export async function remove_index(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/index/delete');

  _print(ret, null);
}

export async function create_data(conn_id, prop, data)
{
  let p = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop,
      data: data
    }
  }

  let ret = await API.run(p, CONFIG.proxy.url, '/platform/fsys/data/write');

  _print(ret, null);
}

export async function get_data(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/data/read');

  _print(ret, null);
}

export async function modify_data(conn_id, prop, data)
{
  let p = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop,
      data: data
    }
  }

  let ret = await API.run(p, CONFIG.proxy.url, '/platform/fsys/data/update');

  _print(ret, null);
}

export async function remove_data(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/data/delete');

  _print(ret, null);
}

export async function count_data(conn_id, prop)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      conn_id: conn_id,
      prop: prop
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/fsys/data/count');

  _print(ret, null);
}

const F = {
  /*filesystem*/
  list_driver:		list_driver,
  load_driver:		load_driver,
  unload_driver:	unload_driver,
  create_conn:		create_conn,
  remove_conn:		remove_conn,
  list_conn:		list_conn,
  create_fs:		create_fs,
  remove_fs:		remove_fs,
  create_dir:           create_dir,
  remove_dir:           remove_dir,
  create_file:          create_file,
  remove_file:          remove_file,
  create_index:		create_index,
  remove_index:		remove_index,
  create_data:		create_data,
  get_data:		get_data,
  modify_data:		modify_data,
  remove_data:		remove_data,
  count_data:		count_data
};

export default F;

