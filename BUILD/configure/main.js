import {
  conf
} from './configs'

import {
  write_license
} from './tools'

export async function fe_configure()
{
  let i = 0;

  for(let i = 0; i<conf.length; i++){  
    write_license(conf[i].name, conf[i].file);
  }
}

fe_configure();
