/*const fetch = require('node-fetch');

async function req(prop)
{
  try {
    let response = await fetch(prop.url, {
      method: prop.method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: prop.data ? JSON.stringify(prop.data) : null,
    });

    if(response.status >= 200 && response.status < 300) {
      return response.json();
    }
    else if(response.status >= 400 && response.status < 500){
      return {
        status: "err",
        result: {
          info: "server error"
        }
      }
    }
  } catch (error) {
    return {
      status: "err",
      result: {
        info: "network error"
      }
    }
  }
}

async function run(param, proxy_url, name)
{
  let prop = {
    method: 'POST',
    url: proxy_url+name,
    data: param
  }

  let ret = await req(prop);

  return ret;
}

const API = {
  run:  run
}

export default API;*/

const fetch = require('node-fetch');
const https = require('https');

//FIXME: for test: self signed certificate
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function req(prop)
{
  let https = prop.url.includes('https://')?true:false;  //FIXME: for self signed cert only

  try {
   
    let response = await fetch(prop.url, {

      method: prop.method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
     
      body: prop.data ? JSON.stringify(prop.data) : null,
      agent: https?httpsAgent:null,
    });
  
    if(response.status >= 200 && response.status < 300) {
      return response.json();
    }
    else if(response.status >= 400 && response.status < 500){
      return {
        status: "err",
        result: {
          info: {
            msg: "server error",
            srv: prop.url
          }
        }
      }
    }
  } catch (error) {
    return {
      status: "err",
      result: {
        info: {
          msg: "network error",
          srv: prop.url
        }
      }
    }
  }
}

async function run(param, proxy_url, name)
{
  let prop = {
    method: 'POST',
    url: proxy_url+name,
    data: param
  }

  let ret = await req(prop);

  return ret;
}

const NET = {
  run: run
}

export default NET
