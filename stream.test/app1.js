import CONFIG from './config/config'
import STREAM from '../../corner.backend/tools/stream'

var st;

var test_init = async() => {
  st = await STREAM.connect(CONFIG.stream, "/emr/stats")

  STREAM.join(st, {
    id: CONFIG.auth1.license
  });

  let events = [
    {
      e_name: 'e_stat',
      cb: on_stat
    }
  ]

  STREAM.listen(st, events);

  let p = {
    from: CONFIG.auth1.license,
    to: "A",
    e_name: "e_test",
    data: "we are live!"
  }

  STREAM.send(st, p);
}

function on_stat(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

function on_search(data)
{
  console.log('on_query = '+data);
}

console.log("watcher is running")

test_init();
