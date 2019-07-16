import CONFIG from './config/config'
import STREAM from './stream/stream'

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";

var test_init = async() => {
  await STREAM.connect(CONFIG.stream, "/platform/auth/search")

  STREAM.join("/platform/auth/search", {
    id: CONFIG.auth.license
  });

  let events = [
    {
      e_name: 'e_search',
      cb: on_search
    }
  ]

  STREAM.listen("/platform/auth/search", events);
}


stdin.on("data", function(key) {
  console.log(key.charCodeAt(0));
  if(key == '\u0003'){
    process.exit();
  }
  else if(key == '\u007F'){
    needle = needle.slice(0, -1);
  }
  else {
    needle += key;
  }

  let p = {
    from: CONFIG.auth.license,
    to: "177652917178",
    e_name: "e_search",
    data: {
      type: "cap",
      args: {
        type: "desc",
        needle: needle
      }
    }
  }

  STREAM.send("/platform/auth/search", p);
});

function on_search(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

console.log("Stream test")

test_init();
