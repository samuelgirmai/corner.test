import _ from 'lodash'
import moment from 'moment'

var INMEM_STORAGE = [];
var lxfs = 0;

async function _fs_open()
{
  if(!INMEM_STORAGE){
    return 0;
  }

  lxfs = 1;

  return 1;
}

async function _fs_close()
{
  if(!lxfs){
    return 0;
  }

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

module.exports = {
  open:		_fs_open,
  close:	_fs_close,
  write:	_fs_write,
  read:		_fs_read
}

