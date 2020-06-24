import NET from '../net';

var clients = [];

clients.push(require('./clients/socket-io'));
clients.push(require('./clients/primus'));

var streams = {};
var sd_name = '';     //stream driver name

export async function stream_connect(config, s_name)
{
  let data = {
    auth: {
      license: config.auth.license,
    },
  }

  let r = await NET.run(data, config.proxy.url, '/platform/stream/config/read');

  if(r.status == "err") { console.log(r)
    return 0;
  }

  sd_name = r.result.sd_name;

  streams[s_name] = await _get_client().connect(config.stream.url, s_name);

  return 1;
}

export async function stream_join(s_name, user)
{
   _get_client().join(streams[s_name], user);
}

export async function stream_leave(s_name, user)
{
  _get_client().leave(streams[s_name], user);
}

export function stream_send(s_name, data)
{
  _get_client().send(streams[s_name], data);
}

export async function stream_listen(s_name, events)
{
  if(!streams[s_name])
    return;
  _get_client().listen(streams[s_name], events);
}

export async function stream_open(s_name, config)
{
  let r, data;

  data = {
    auth: {
      license: config.auth.license,
    },
    param: {
      s_name: s_name
    }
  }

  r = await NET.run(data, config.proxy.url, '/platform/stream/open');
  if(r.status == "err") {
    return 0;
  }

  r  = await stream_connect(config, s_name);
  if(!r)
    return 0;

  await stream_join(s_name, {license: config.auth.license, id: config.auth.service_id});

  return 1;
}

function _get_client()
{
  for(let i = 0; i < clients.length; i++){
    if(clients[i].name == sd_name){

      return clients[i];
    }
  }
  
  return clients[0];  //default socket-io
}

const STREAM = {
  open: stream_open,
  connect: stream_connect,
  join: stream_join,
  leave: stream_leave,
  listen: stream_listen,
  send: stream_send
}

export default STREAM

