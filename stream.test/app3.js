import CONFIG from './config/config'
import STREAM from '../../corner.backend/tools/stream'

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";

var st;

var test_init = async() => {
  st = await STREAM.connect(CONFIG.stream, "/emr/search")

  STREAM.join(st, {
    id: CONFIG.auth3.license
  });

  let events = [
    {
      e_name: 'e_search',
      cb: on_search
    }
  ]

  STREAM.listen(st, events);
}


stdin.on("data", function(key) {
  needle += key;

  if(key == '\u0003'){
    process.exit();
  }

  let p = {
    from: CONFIG.auth3.license,
    to: "B",
    e_name: "e_search",
    data: {
      type: "patient",
      args: {
        type: "name",
        needle: needle
      }
    }
  }

  STREAM.send(st, p);
});

function on_search(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

console.log("Stream test")

test_init();
