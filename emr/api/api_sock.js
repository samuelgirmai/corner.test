import io from 'socket.io-client';
import CONFIG from '../config/config'

var socket = null;

async function sockInit()
{
  let prop = {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
  };

  socket = io.connect(CONFIG.STREAM.URI, prop);
}

export function send(e_type, data)
{
  socket.emit(e_type, data);
}

export async function init()
{
  await sockInit();
}

export function register_handler(handle)
{
  if(handle.onStat){
    socket.on('e_stat', function(data){
      handle.onStat(data);
    });
  }

  if(handle.onConnect){
    socket.on('connect', function(data){
      handle.onConnect();
    });
  }

  if(handle.onDisconnect){
    socket.on('disconnect', function(data){
      handle.onDisconnect();
    });
  }
}

const API_SOCK = {
  init: init,
  register_handler: register_handler,
  send: send
}

export default API_SOCK;