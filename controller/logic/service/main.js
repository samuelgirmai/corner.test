import inquirer from 'inquirer'

import {
  controller_start
} from '../main'

import CTRL from './controller'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test shell',
    choices: ['stage1: init', 'stage2: basic', 'stage3: services', 'stage4: fini', 'stage5: boot', '<<back']
  }
];

export async function show_service()
{
  let r;

  r = await CTRL.proc_info();

  if(r.status == "err"){
    console.log(".err.basic.config");
  }

  console.log(JSON.stringify(r.result, 0, '  '));

  controller_start();
}

async function init()
{
  let r;

  /*r = await CTRL.proc_fs("mkfs", "boot");

  if(r.status == "err"){
    console.log(".err.fs.mkfs.boot");
  }

  r = await CTRL.proc_fs("mkfs", "corner");
  
  if(r.status == "err"){
    console.log(".err.fs.mkfs.corner");
  }

  r = await CTRL.proc_fs("mkfs", "finance");

  if(r.status == "err"){
    console.log(".err.fs.mkfs.finance");
  }

  r = await CTRL.proc_fs("mkfs", "issuance");
  
  if(r.status == "err"){
    console.log(".err.fs.mkfs.issuance");
  }*/


  r = await CTRL.proc_basic("config");

  if(r.status == "err"){
    console.log(".err.basic.config");
  }

  r = await CTRL.proc_basic("fsys");
  
  if(r.status == "err"){
    console.log(".err.basic.fsys");
  }

  r = await CTRL.proc_basic("session");

  if(r.status == "err"){
    console.log(".err.basic.session");
  }

  r = await CTRL.proc_reboot();

  console.log(r);

  return;
}

async function basic()
{
  let r;

  /*r = await CTRL.proc_basic("fsys");

  if(r.status == "err"){
    console.log(".err.basic.fsys");
  }

  r = await CTRL.proc_basic("session");

  if(r.status == "err"){
    console.log(".err.basic.session");
  }*/

  r = await CTRL.proc_basic("setup", null);

  if(r.status == "err"){
    console.log(".err.basic.setup");
  }

  /*FIXME:*/
  r = await CTRL.proc_basic("state", "config");

  if(r.status == "err"){
    console.log(".err.basic.state");
  }

  r = await CTRL.proc_basic("allow");

  if(r.status == "err"){
    console.log(".err.basic.allow");
  }

  r = await CTRL.proc_basic("session");

  if(r.status == "err"){
    console.log(".err.basic.session");
  }

  await CTRL.proc_reboot();

  return;
}

async function other()
{
  let r;

  r = await CTRL.proc_basic("state", "config");

  if(r.status == "err"){
    console.log(".err.basic.state");
  }

  r = await CTRL.proc_third("config");

  if(r.status == "err"){
    console.log(".err.third.config");
  }

  r = await CTRL.proc_third("fsys");

  if(r.status == "err"){
    console.log(".err.third.fsys");
  }

  r = await CTRL.proc_third("setup", "corner.client.root");

  if(r.status == "err"){
    console.log(".err.third.state");
  }

  r = await CTRL.proc_third("allow");

  if(r.status == "err"){
    console.log(".err.third.allow");
  }

  r = await CTRL.proc_third("session");

  if(r.status == "err"){
    console.log(".err.third.session");
  }

  await CTRL.proc_reboot();

  return;
}

async function fini()
{
  let r;

  r = await CTRL.proc_basic("state", "config");

  if(r.status == "err"){
    console.log(".err.basic.state");
  }

  r = await CTRL.proc_basic("allow");

  if(r.status == "err"){
    console.log(".err.basic.allow");
  }

  r = await CTRL.proc_basic("session");

  if(r.status == "err"){
    console.log(".err.basic.session");
  }

  await CTRL.proc_reboot();

  return;
}

async function boot()
{
  let r;
 
  /*r = await CTRL.proc_basic("session");

  if(r.status == "err"){
    console.log(".err.basic.session");
  }*/

  r = await CTRL.proc_basic("state", "start");

  if(r.status == "err"){
    console.log(".err.basic.state");
  }

  r = await CTRL.proc_third("state", "start");

  if(r.status == "err"){
    console.log(".err.third.state");
  }

  return;
}

export async function start_service()
{
  let r;

  r = await CTRL.proc_basic("state", "start");

  if(r.status == "err"){
    console.log(".err.basic.state");
  }

  r = await CTRL.proc_third("state", "start");

  if(r.status == "err"){
    console.log(".err.third.state");
  }

  controller_start();
}

export async function service_controller()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'stage1: init':
      await init();
      break;
    case 'stage2: basic':
      await basic();
      break;
    case 'stage3: services':
      await other();
      break;
    case 'stage4: fini':
      await fini();
      break;
    case 'stage5: boot':
      await boot();
      break;
    case '<<back':
      controller_start();
      return;
  }

  service_controller();
}

