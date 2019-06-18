import io from 'socket.io-client';

var streams = {};

export async function stream_connect(st_conf, s_name)
{
  let prop = {
    transports: ['websocket'],
    //forceNew: true
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  };

  streams[s_name] = io.connect(st_conf.url+s_name);
}

export async function stream_join(s_name, user)
{
  streams[s_name].emit('join', user);
}

export async function stream_exit(s_name, user)
{
  streams[s_name].emit('exit', user);
}

export function stream_send(s_name, data)
{
  streams[s_name].emit('send', data);
}

export function stream_listen(s_name, events)
{
  //alert(JSON.stringify(events, 0, '  '))
  for(let i = 0; i < events.length; i++) {
    streams[s_name].on(events[i].e_name, (data) => {
      events[i].cb(data);
    });
  }
}

const STREAM = {
  connect: stream_connect,
  join: stream_join,
  exit: stream_exit,
  listen: stream_listen,
  send: stream_send
}

export default STREAM

