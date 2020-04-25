import _ from 'lodash'
import fs from 'fs'
import moment from 'moment'

var INMEM_STORAGE = [];
var FLASH_STORAGE = __dirname+"/.store.json";

var lxfs = 0;

async function _fs_open()
{
  if(!fs.existsSync(FLASH_STORAGE)){
    return 0;
  }

  INMEM_STORAGE = JSON.parse(fs.readFileSync(FLASH_STORAGE, 'utf8'));

  lxfs = 1;

  return 1;
}

async function _fs_close()
{
  if(!lxfs){
    return 0;
  }

  fs.writeFileSync(FLASH_STORAGE, JSON.stringify(INMEM_STORAGE), 'utf8');

  INMEM_STORAGE = [];

  return 1;
}

async function _fs_write(item)
{
  if(!lxfs){
    return 0;
  }

  INMEM_STORAGE.push(item);
}

async function _fs_read(f)
{
  if(!lxfs){
    return 0;
  }

  let r, b = true;

  r = INMEM_STORAGE.filter((o)=>{
   if(f.state){
     if(f.state == o.state){
       b = b && true;
     }
     else {
       return false;
     }
   }

   if(f.timestamp) {
     if(f.timestamp == o.timestamp){
       b = b && true;
     }
     else {
       return false
     }
   }

   return b;
  });

  return r;
}

async function _fs_remove(f)
{
  if(!lxfs){
    return 0;
  }

  let r, b = true;

  INMEM_STORAGE = INMEM_STORAGE.filter((o)=>{
    if(f._id){
      if(f._id == o._id){
        b = b && false;
      }
      else {
        return true;
      }
    }
  });

  return 1;
}

module.exports = {
  open:		_fs_open,
  close:	_fs_close,
  write:	_fs_write,
  read:		_fs_read,
  remove:	_fs_remove
}

