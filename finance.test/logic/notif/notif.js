import CONFIG from './config/config'
import STREAM from '../../../../tools/stream'

var notif_init = async() => {
  await STREAM.connect(CONFIG.stream, "/app/rufta/notif")

  STREAM.join("/app/rufta/notif", {
    license: CONFIG.auth.license,
    id: '123432'
  });

  let events = [
    {
      e_name: 'e_assign',
      cb: on_assign
    },
    {
      e_name: 'e_lorder',
      cb: on_labOrder
    },
    {
      e_name: 'e_lresult',
      cb: on_labResult,
    },
    {
      e_name: 'e_dorder',
     cb: on_drugOrder
    }
  ]

  STREAM.listen("/app/rufta/notif", events);
}

function send_notif(e_name)
{
  let p = {
    from: CONFIG.auth.license,
    to: null,
    e_name: e_name,
    data: "we are live!"
  }

  STREAM.send("/app/rufta/notif", p);
}

function on_assign(p)
{
  console.log(JSON.stringify(p, 0, '  '));

  //send_notif('e_lorder');
}

function on_labOrder(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}


function on_labResult(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}


function on_drugOrder(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}


console.log("watcher is running")

notif_init();
