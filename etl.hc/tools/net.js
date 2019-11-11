const fetch = require('node-fetch');
const CONFIG = require('../config/config');

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

async function run(param, name)
{
  let prop = {
    method: 'POST',
    url: CONFIG.proxy.url+name,
    data: param
  }

  let ret = await req(prop);

  return ret;
}

const API = {
  run:  run
}

module.exports = API;

