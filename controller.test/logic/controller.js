import API from '../tools/net';
import CONFIG from '../config/config'

function _print(o, key) 
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }

  console.log(JSON.stringify(o, 0, '  '));
}

export async function modify_state()
{
  let ret;
 
  let param = {
    services: [
      {
        name: "corner",
        uservices: [
           {
             name: "muxer",
             state: "start"
           },
           {
             name: "auth",
             state: "start"
           },
           {
             name: "notif",
             state: "start"
           },
           {
             name: "stream",
             state: "start"
           }
        ]
      },
      {
        name: "emr",
        uservices: [
          {
            name: "admin",
            state: "start"
          },
          {
            name: "infotics",
            state: "start"
          },
          {
            name: "notif",
            state: "start"
          },
          {
            name: "pharmacy",
            state: "start"
          },
          {
            name: "finance",
            state: "start"
          },
          {
            name: "lab",
            state: "start"
          },
          {
            name: "mru",
            state: "stop"
          },
          {
            name: "payment",
            state: "start"
          },
          {
            name: "practner",
            state: "start"
          },
          {
            name: "triage",
            state: "start"
          },
          {
            name: "storeSimulator",
            state: "start"
          }
        ]
      }
    ]
  }

  /*let param = {
    services: [
      {
        name: "filesystem",
        uservices: [
           {
             name: "tools",
             state: "mkfs"
           }
         ]
      }
    ]
  }*/


  /*
   * TODO: change CONFIG.master.url to network address
   * found from get_info
   */
  ret = await API.run(CONFIG.master.url, param, '/platform/controller/state/update');
  
  _print(ret, null);

  return ret;
}

export async function get_info()
{
  let ret;

  let data = {};

  ret = await API.run(CONFIG.master.url, data, '/platform/controller/info/read');

  _print(ret, null);

  return ret;
}

