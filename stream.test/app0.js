import CONFIG from './config/config'
import STREAM from '../../corner.backend/tools/stream'

var st;

var test_init = async() => {
  await STREAM.connect(CONFIG.stream, "/emr/stats")

  STREAM.join("/emr/stats", {
    id: CONFIG.auth0.license
  });

  let events = [
    {
      e_name: 'e_stat',
      cb: on_stat
    }
  ]

  STREAM.listen("/emr/stats", events);

  let p = {
    from: CONFIG.auth0.license,
    to: "A",
    e_name: "e_test",
    data: "we are live!"
  }

  STREAM.send("/emr/stats", p);
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
