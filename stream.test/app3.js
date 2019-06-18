import CONFIG from './config/config'
import STREAM from './stream/stream'

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";

var test_init = async() => {
  await STREAM.connect(CONFIG.stream, "/emr/search")

  STREAM.join("/emr/search", {
    id: CONFIG.auth3.license
  });

  let events = [
    {
      e_name: 'e_search',
      cb: on_search
    }
  ]

  STREAM.listen("/emr/search", events);
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

  STREAM.send("/emr/search", p);
});

function on_search(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

console.log("Stream test")

test_init();
