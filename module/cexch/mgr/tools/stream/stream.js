import NET from '../net';

const DRIVER = require('./drivers/socket-io');

var STREAMS = {};

export async function open(proxy, s_name, auth)
{
  let data = {
    auth: auth,
    param: {
      s_name: s_name
    }
  }

  let r = await NET.run(data, proxy, '/platform/stream/open');

  return r;
}

export async function connect(url, s_name, auth)
{
  STREAMS[s_name] = await DRIVER.connect(url, s_name, auth);
 
  return 1;
}

export function send(s_name, data)
{
  DRIVER.send(STREAMS[s_name], data);
}

export async function listen(s_name, events)
{
  if(!STREAMS[s_name]){
    return 0;
  }

  DRIVER.listen(STREAMS[s_name], events);

  return 1;
}

const S = {
  open:		open,
  connect:	connect,
  listen:	listen,
  send:		send
}

export default S

