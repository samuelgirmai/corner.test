var Primus = require('primus');

async function connect(url, s_name)
{
  let options = {
    reconnect: {
        max: 5000, // Number: The max delay before we try to reconnect.
        min: 1000, // Number: The minimum delay before we try reconnect.
        retries: Infinity // Number: How many times we should try to reconnect.
    },
    transport: {
      rejectUnauthorized: false
    }
  };

  var Socket = new Primus.createSocket({ 
    transformer: 'websockets', 
    parser: 'JSON',
    plugin: {
      multiplex: require('primus-multiplex'),
      rooms: require('primus-rooms'),
      emitter: require('primus-emitter')
    }

  })
  var client = new Socket(url, options);

  var conn  = client.channel(s_name);
  return conn;
}

async function join(conn, user)
{
  conn.send('join', user);
}

function leave(conn, user)
{
  conn.send('leave', user);
}

function send(conn, data)
{
  conn.send('send', data);
}

function listen(conn, events)
{
   
  for(let i = 0; i < events.length; i++) {
    conn.on(events[i].e_name, (data) => {
      events[i].cb(data);
    });
  }
}

module.exports = {
  name: 'primus',
  connect,
  join,
  leave,
  listen,
  send
}

