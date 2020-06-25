import CONFIG from './config/config'
import STREAM from './tools/stream/stream'
import API from './tools/net';

var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

var needle = "";
var search_id = "";

var test_init = async() => {

  let r = await STREAM.connect(CONFIG, "/platform/auth/search");
  if(!r){
    console.log('could not connect');
    process.exit();
  }

  STREAM.join("/platform/auth/search", {
    license: CONFIG.auth.license,
    id: CONFIG.auth.client_id
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

  needle = needle.replace(/(\n|\r)+$/, '');


  let p = {
    from: CONFIG.auth.client_id,
    to: "124891",	///NB: this AUTH server service_id
    e_name: "e_search",
    data: {
      type: "service",	//cap | service | client
      args: {
        type: "name",
        needle: needle,
      }
    }
  }
  console.log(p);

  STREAM.send("/platform/auth/search", p);
});

function on_search(p)
{
  console.log(JSON.stringify(p, 0, '  '));
}

console.log("Stream test");

test_init();
