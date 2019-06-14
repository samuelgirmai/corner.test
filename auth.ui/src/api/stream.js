import io from 'socket.io-client';

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

  let st = io.connect(st_conf.url+s_name);

  return st
}

export async function stream_join(st, user)
{
  st.emit('join', user);
}

export async function stream_exit(st, user)
{
  st.emit('exit', user);
}

export function stream_send(st, data)
{
  st.emit('send', data);
}

export function stream_listen(st, events)
{
  for(let i = 0; i < events.length; i++) {
    st.on(events[i].e_name, (data) => {
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

