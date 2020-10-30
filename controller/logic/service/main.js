import inquirer from 'inquirer'

import {
  controller_start
} from '../main'

import CTRL from './controller'

const main_prompt = [
  {
    type: 'list',
    name: 'main',
    message: 'controller test window',
    choices: ['info', 'fs', 'basic', 'other', 'start', '<<back']
  }
];

async function info()
{
  let r;

  r = await CTRL.proc_info();

  if(r.status == "err"){
    console.log(".err.basic.config");
  }

  console.log(JSON.stringify(r.result, 0, '  '));
}

async function fs()
{
  let r;

  r = await CTRL.proc_fs("config");

  if(r.status == "err"){
    console.log(".err.fs.config");
  }

  r = await CTRL.proc_fs("setup", "boot");

  if(r.status == "err"){
    console.log(".err.fs.setup.boot");
  }

  r = await CTRL.proc_fs("setup", "corner");
  
  if(r.status == "err"){
    console.log(".err.fs.setup.corner");
  }

  r = await CTRL.proc_fs("setup", "issuance");
  
  if(r.status == "err"){
    console.log(".err.fs.setup.issuance");
  }

  await CTRL.proc_reboot();

  return;
}

async function basic()
{
  let r;

  r = await CTRL.proc_basic("config");

  if(r.status == "err"){
    console.log(".err.basic.config");
  }

  r = await CTRL.proc_basic("setup", null);

  if(r.status == "err"){
    console.log(".err.basic.setup");
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

  r = await CTRL.proc_third("setup", "corner.client.root");

  if(r.status == "err"){
    console.log(".err.third.state");
  }

  r = await CTRL.proc_thrid("allow");

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

async function start()
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

  return;
}

export async function service_controller()
{
  let option = await inquirer.prompt(main_prompt);

  switch(option.main){
    case 'info':
      await info();
      break;
    case 'fs':
      await fs();
      break;
    case 'basic':
      await basic();
      break;
    case 'other':
      await other();
      break;
    case 'start':
      await start();
      break;
    case '<<back':
      controller_start();
      return;
  }

  service_controller();
}

