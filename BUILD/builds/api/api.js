import express from 'express'

import {
  apps
} from '../apps';

async function api()
{
  for(let i=0; i<apps.length; i++) {
    let e = express();

    e.use(apps[i].mnt, express.static(__dirname+"/../public/"+apps[i].name));

    e.listen(apps[i].port, apps[i].bind, () => console.log(
      JSON.stringify(apps[i])
      //`[${apps[i].name}.corner] running at http://${apps[i].bind}:${apps[i].port}`
    ));
  }
}

export function api_open()
{ 
  api();
}

