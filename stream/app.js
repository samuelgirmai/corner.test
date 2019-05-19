import API_STREAM from './api/api_sock'

var st;

var user = {
  id: process.argv[2]
}

var test_init = async() => {
  let st_conf = {
    uri: "http://localhost:8890",
    name: "test"
  }

  st = await API_STREAM.init(st_conf);

  API_STREAM.join(st, user);

  let events = [
    {
      e_name: 'e_stat',
      func: on_stat
    },
    {
      e_name: 'e_query',
      func: on_search
    }
  ]

  API_STREAM.events(st, events);

  API_STREAM.write(st, 'e_live', user);
}

function on_stat(data)
{
  console.log('on_stat = '+data);

  API_STREAM.exit(st, user);
}

function on_search(data)
{
  console.log('on_query = '+data);
}

console.log("watcher is running "+process.argv[2])

test_init();
