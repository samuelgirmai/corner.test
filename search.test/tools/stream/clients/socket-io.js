import io from 'socket.io-client';

export async function connect(url, s_name)
{
  let options = {
    transports: ['websocket'],
    //forceNew: true
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity,
    //FIXME: below option is for self signed cert
    rejectUnauthorized : false,
    secure: true
  };
   var conn = io.connect(url+s_name, options);

   return conn;
}

export async function join(conn, user)
{
  await conn.emit('join', user);
}

export async function leave(conn, user)
{
  conn.emit('leave', user);
}

export function send(conn, data)
{
    conn.emit('send', data);
}

export async function listen(conn, events)
{
   
  for(let i = 0; i < events.length; i++) {
    conn.on(events[i].e_name, (data) => {
      events[i].cb(data);
    });
  }
}

module.exports = {
  name: 'socket-io',
  connect,
  join,
  leave,
  listen,
  send
}
