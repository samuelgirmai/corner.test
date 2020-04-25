import API from '../../tools/net';
import CONFIG from './config/config'

import fs from 'fs'
import moment from 'moment'
import randomstring from 'randomstring'

/*import {
  _fs_open,
  _fs_close,
  _fs_read,
  _fs_write
} from './storage/inmem_fs';

import {
  _fs_open,
  _fs_close,
  _fs_read,
  _fs_write
} from './storage/disk_fs';*/

var STORAGE = null;

class Storage {
  constructor(ops){
    this.open = ops.open;
    this.close = ops.close;
    this.read = ops.read;
    this.write = ops.write;
    this.remove = ops.remove;
  }
}

class Item {
  constructor(data, uri){
    this.data = data;
    this.uri = uri;
    this._id = generate_id(12);
  }

  state = '0'; /*0 = SYNCED, 1 = UNSYNCED*/
  timestamp = moment().unix();
}

function generate_id(length)
{
  return randomstring.generate({
    length: length,  //FIXME
    charset: 'numeric',
  })
}

export async function open(s_type)
{
  if(!s_type){
    return 0;
  }

  STORAGE = new Storage(require("./storage/"+s_type));

  return STORAGE.open();
}

export async function close()
{
  if(!STORAGE){
    return 0;
  }

  STORAGE.close();

  STORAGE = null;

  return 1;
}

export async function read(state)
{
  if(!STORAGE){
    return 0;
  }

  return STORAGE.read({state: state});
}

export async function write(data, uri)
{
  if(!STORAGE){
    return 0;
  }

  let item;

  item = new Item(data, uri);

  STORAGE.write(item)
   
  return 1;
}

export async function sync()
{
  let items, ret, rlist, synced = 0, unsynced = 0;

  if(!STORAGE){
    return 0;
  }

  items = await STORAGE.read({state: 0});

  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      items: items
    }
  }

  ret = await API.run(data, CONFIG.proxy.url, '/platform/auth/lxcache/sync');
  
  if(ret.status == "err"){
    return 0;
  }

  rlist = ret.result.ret_list;

  for(let i = 0; i<rlist.length; i++){
    if(rlist[i].ret.status == "err"){
      ++unsynced;
      continue;
    }

    STORAGE.remove({_id: rlist[i]._id});

    ++synced;
  }

  console.log("_ITEMS(SYNCED, UNSYNED) = ("+synced+", "+unsynced+")");

  return ret;
}

const LxSTORE = {
  open:		open,
  close:	close,
  read:		read,
  write:	write,
  sync:		sync
}

export default LxSTORE;
