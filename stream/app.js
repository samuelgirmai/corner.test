import CONFIG from './config/config'
import STREAM from '../../corner.backend/tools/stream'

var st;

var test_init = async() => {
  st = await STREAM.connect(CONFIG.stream);

  STREAM.join(st, CONFIG.auth.license);

  let events = [
    {
      e_name: 'e_stat',
      cb: on_stat
    },
    {
      e_name: 'e_query',
      cb: on_search
    }
  ]

  STREAM.listen(st, events);

  let s = {
    from: argv[1],
    to: "B",
    e_name: "e_live",
    data: "we are live!"
  }

  STREAM.send(st, s);
}

function on_stat(data)
{
  console.log('on_stat = '+data);

  STREAM.exit(st, user);
}

function on_search(data)
{
  console.log('on_query = '+data);
}

console.log("watcher is running")

test_init();
