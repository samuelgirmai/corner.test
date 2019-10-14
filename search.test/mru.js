import CONFIG from './config/config'
import STREAM from './stream/stream'

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";

var test_init = async() => {
  await STREAM.connect(CONFIG.stream, "/app/emr/mru/search")

  STREAM.join("/app/emr/mru/search", {
    id: CONFIG.auth.license
  });

  let events = [
    {
      e_name: 'e_search',
      cb: on_search
    }
  ]

  STREAM.listen("/app/emr/mru/search", events);
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
    to: "913278492930",
    e_name: "e_search",
    data: {
      type: "patient",
      args: {
        type: "name",
        needle: needle,
        filters: [
          /*{
            name: "age",
            arg: {
              type: "gt",
              val: 40
            }
          },*/
          /*{
            name: "status",
            arg: {
              val: "active",
            }
          },
          {
            name: "gender",
            arg: {
              val: "F"
            },
          },*/
          {
            name: "appointment",
            arg: {
              val: "17/12/2019"
            }
          }
        ]
      }
    }
  }

  STREAM.send("/app/emr/mru/search", p);
});

function on_search(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

console.log("Stream test")

test_init();
