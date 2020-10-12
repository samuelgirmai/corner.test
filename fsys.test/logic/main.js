import inquirer from 'inquirer';

import F from './fsys';

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'Filesystem Test',
    choices: ['list_driver', 'load_driver', 'unload_driver', '------------', 'create_conn', 'remove_conn', 'list_conn', '------------', 'create_fs', 'remove_fs', '------------', 'create_dir', 'remove_dir', 'create_file', 'remove_file', 'create_index', 'remove_index', '------------', 'create_data', 'get_data', 'modify_data', 'remove_data', 'count_data', 'Exit']
  }
];

var conn_id;

async function load_driver()
{
  const p = [
    {
      name: 'name',
      message: 'Enter FS Name: '
    }
  ];

  let d = await inquirer.prompt(p);

  return await F.load_driver(d.name);
}

async function unload_driver()
{
  const p = [
    {
      name: 'name',
      message: 'Enter FS Name: '
    }
  ];

  let d = await inquirer.prompt(p);

  return await F.unload_driver(d.name);
}

async function create_conn()
{
  const p = [
    { 
      name: 'name',
      message: 'Enter FS Name: '
    },
    {
      name: 'host',
      message: 'Enter Host: '
    },
    {
      name: 'port',
      message: 'Enter Port: '
    }
  ];

  let d = await inquirer.prompt(p);
  
  conn_id = await F.create_conn(d.name, {host: d.host, port: d.port});
} 

async function remove_conn()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    }
  ];

  let d = await inquirer.prompt(p);

  return await F.remove_conn(d.conn_id);
}

async function create_dir()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    }
  ];

  let d = await inquirer.prompt(p);
  
  return await F.create_dir(d.conn_id, d);
}

async function remove_dir()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    }
  ];

  let d = await inquirer.prompt(p);

  return await F.remove_dir(d.conn_id, d);
}

async function create_file()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];
  
  let f = await inquirer.prompt(p);
  
  return await F.create_file(f.conn_id, f);
}

async function remove_file()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let f = await inquirer.prompt(p);

  return await F.remove_file(f.conn_id, f);
}

async function create_index()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    },
    {
      name: 'index',
      message: 'Enter Index Filed: '
    }
  ];

  let x = await inquirer.prompt(p);

  return await F.create_index(x.conn_id, x);
}

async function remove_index()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    },
    {
      name: 'index',
      message: 'Enter Index Filed: '
    }
  ];

  let x = await inquirer.prompt(p);

  return await F.remove_index(x.conn_id, x);
}


async function create_fs()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      type: 'number',
      name: 'd',
      message: 'Enter # dirs: '
    },
    {
      type: 'number',
      name: 'f',
      message: 'Enter # files: '
    },
    {
      type: 'number',
      name: 'x',
      message: 'Enter # index: '
    }
  ];

  let l = await inquirer.prompt(p);

  let fs = {
    dir: []
  }
  
  for(let i = 0; i < parseInt(l.d); i++) {
    fs.dir.push({
      name: "d"+i,
      file: []
    });

    for(let j = 0; j < parseInt(l.f); j++){
      fs.dir[i].file.push({
        name: "f"+j,
        index: []
      });

      for(let k = 0; k < parseInt(l.x); k++){
        fs.dir[i].file[j].index.push("x"+k);
      }
    } 
  }

  console.log(JSON.stringify(fs, 0, '  '));

  return await F.create_fs(l.conn_id, fs);
}

async function remove_fs()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      type: 'number',
      name: 'd',
      message: 'Enter # dirs: '
    }
  ];

  let l = await inquirer.prompt(p);

  let fs = {
    dir: []
  }

  for(let i = 0; i < parseInt(l.d); i++) {
    fs.dir.push({
      name: "d"+i,
      file: []
    });
  }

  console.log(JSON.stringify(fs, 0, '  '));

  return await F.remove_fs(l.conn_id, fs);
}

async function create_data()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let pii = {
    name: "samuel",
    pos: "cto",
    dob: "10/10/20"
  }

  let f = await inquirer.prompt(p);
  
  return await F.create_data(f.conn_id, f, pii);
}

async function get_data()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let f = await inquirer.prompt(p);
  
  f['filter'] = {pos: "cto"};

  return await F.get_data(f.conn_id, f);
}

async function remove_data()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let f = await inquirer.prompt(p);

  f['filter'] = {};
  
  return await F.remove_data(f.conn_id, f);
}

async function modify_data()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let f = await inquirer.prompt(p);

  let pii = {
    name: "samuel",
    pos: "ceo",
    dob: "10/10/20"
  }

  f['filter'] = {pos: "cto"};
  
  return await F.modify_data(f.conn_id, f, pii);
}

async function count_data()
{
  const p = [
    {
      name: 'conn_id',
      message: 'Enter Conn ID: '
    },
    {
      name: 'dir',
      message: 'Enter Dir Name: '
    },
    {
      name: 'file',
      message: 'Enter File Name: '
    }
  ];

  let f = await inquirer.prompt(p);

  f['filter'] = {};
  
  return await F.count_data(f.conn_id, f);
}

async function _start()
{
  var ret;

  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'list_driver':
      await F.list_driver();
      break;
    case 'load_driver':
      await load_driver();
      break;
    case 'unload_driver':
      await unload_driver();
      break;
    case 'create_conn':
      conn_id = await create_conn();
      break;
    case 'remove_conn':
      await remove_conn();
      break;
    case 'list_conn':
      await F.list_conn();
      break;
    case 'create_fs':
      await create_fs();
      break;
    case 'remove_fs':
      await remove_fs();
      break;
    case 'create_dir':
      await create_dir();
      break;
    case 'remove_dir':
      await remove_dir();
      break;
    case 'create_file':
      await create_file();
      break;
    case 'remove_file':
      await remove_file();
      break;
    case 'create_index':
      await create_index();
      break;
    case 'remove_index':
      await remove_index();
      break;
    case 'create_data':
      await create_data();
      break;
    case 'get_data':
      await get_data();
      break;
    case 'modify_data':
      await modify_data();
      break;
    case 'remove_data':
      await remove_data();
      break;
    case 'count_data':
      await count_data();
      break;
  }

  if(ret){
    main_propmt.default = 'Exit';
  }

  _start();
}

_start();
