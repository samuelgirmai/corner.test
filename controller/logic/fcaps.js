import crypto from 'crypto'


/*
 * this is highly secret function; only for
 * internal use (like within controller or auth.ui)
 * also used in platform.auth
 */

var SECRET_KEY = 'secret35711';

function _uri2capid_secret(uri)
{
  //this is highly secret function
  let ret = crypto.createHmac('sha1', SECRET_KEY).update(uri).digest('hex');

  return ret;
}

export function uris2caps(uris)
{
  let caps = [];

  for(let i = 0; i<uris.length; i++){
    caps.push(_uri2capid_secret(uris[i]));
  }

  return caps
}

