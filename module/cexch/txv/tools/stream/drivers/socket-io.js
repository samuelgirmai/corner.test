import io from 'socket.io-client';

export async function connect(url, s_name, auth)
{
  const conn = io.connect(url+s_name, {
    auth: auth,
    //forceNew: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  });

  conn.on('disconnect', (reason) => {
    console.log("\nDisconnected("+reason+")");
  });

  conn.io.on('reconnect_attempt', (attempts) => {
    console.log("\nReconnecting("+attempts+")");
  });

  conn.io.on('reconnect', (attempts) => {
    console.log("\nOk. Reconnected("+attempts+")");
  });

  conn.io.on('error', async (error) => {
    console.log("Err. "+error);
  })

  return conn;
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
  listen,
  send
}
