import io from 'socket.io-client';

export async function stream_init(st_conf)
{
  let prop = {
    transports: ['websocket'],
    //forceNew: true
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  };

  let st = io.connect(st_conf.uri+'/'+st_conf.name);

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

export function stream_write(st, e_name, data)
{
  st.emit(e_name, data);
}

export function stream_events(st, events)
{
  for(let i = 0; i < events.length; i++) {
    st.on(events[i].e_name, (data) => {
      events[i].func(data);
    });
  }
}

const API_STREAM = {
  init: stream_init,
  join: stream_join,
  exit: stream_exit,
  events: stream_events,
  write: stream_write
}

export default API_STREAM

