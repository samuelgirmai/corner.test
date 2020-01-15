import CONFIG from 'config/config'
import STREAM from 'stream/stream'
import STORE from 'store/main'
import AUTH from 'logic/auth'

export async function init()
{
  await init_stream();
  await init_data();
}


async function init_data()
{
  STORE.init();

  //let s = await AUTH.get_heartbeat();
  //alert(JSON.stringify(s, 0, '  '));

  await AUTH.list_caps();
  await AUTH.list_persons();
  await AUTH.list_clients();
  await AUTH.list_services();
  await AUTH.get_stats("users_count", null);
  await AUTH.get_stats("caps_count", null);
}

async function init_stream()
{
  await STREAM.connect(CONFIG.stream, "/platform/notif")
  await STREAM.connect(CONFIG.stream, "/auth/stats")

  STREAM.join("/platform/notif", {
    id: CONFIG.auth.license
  });

  STREAM.join("/auth/stats", {
    id: CONFIG.auth.license
  });

  STREAM.listen("/platform/notif", [{
    e_name: 'e_notif',
    cb: on_notif
  }]);

  return 1;
}

async function on_notif(p)
{
  //alert(JSON.stringify(p, 0, '  '));
  switch(p.data.type){
    case 'create_person':
      /*
       * FIXME: inefficient; but the idea
       * is to update the store when a user
       * is created
       */
      await AUTH.list_persons();
      break;
    case 'remove_person':
      /*
       * FIXME: inefficient; but the idea
       * is to update the store when a user
       * is created
       */
      await AUTH.list_persons();
      break;
    case 'create_client':
      /*
       * FIXME: inefficient; but the idea
       * is to update the store when a user
       * is created
       */
      await AUTH.list_clients();
      break;
    case 'create_service':
      /*
       * FIXME: inefficient; but the idea
       * is to update the store when a user
       * is created
       */
      await AUTH.list_services();
      break;
  }
}

const INIT = {
  init: init,
}

export default INIT;
