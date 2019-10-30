import CONFIG from './config/config'
import STREAM from './stream/stream'
import API from '../emr.test/tools/net';

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";
var search_id = "";

var test_init = async() => {
  search_id = await set_filter()

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

var set_filter = async () => {
  let filters = [
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
      },*/
      {
        name: "gender",
        arg: {
         val: "M"
        },
       },
      /*{
        name: "appointment",
        arg: {
          val: "17/12/2019"
        }
      }*/
  ]

  let data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      type: "patient",
      filters: filters
    }
  }

  let ret = await API.run(data, '/app/emr/mru/search/filter');
  
  console.log(ret);

  if(ret.status == 'ok'){
    return ret.result.search_id;
  }

  return null;
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
console.log("ID: ", search_id)
  let p = {
    from: CONFIG.auth.license,
    to: "226746445941",
    e_name: "e_search",
    data: {
      type: "patient",
      //search_id: search_id,
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
          },*/
          {
            name: "gender",
            arg: {
              val: "M"
            },
          },
          /*{
            name: "appointment",
            arg: {
              val: "17/12/2019"
            }
          }*/
          {
            name: "recent",
            arg: {
              type: "hours",
              val: 5
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

console.log("Stream test");
test_init();
