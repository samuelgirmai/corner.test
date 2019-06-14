import CONFIG from 'config/config'
import STREAM from 'stream/stream'
import STORE from 'store/main'
import AUTH from 'logic/auth'

var handle;
var st;
export async function init()
{
  await init_stream();
  await init_data();
}


async function init_data()
{
  STORE.init();

  await AUTH.list_caps();
  await AUTH.list_persons();
  await AUTH.list_clients();
  await AUTH.list_services();
  await AUTH.list_logs();
}

async function init_stream()
{
  st = await STREAM.connect(CONFIG.stream, "/platform/notif")

  STREAM.join(st, {
    id: CONFIG.auth.license
  });


  return 1;
}


const INIT = {
  init: init,
}

export default INIT;
