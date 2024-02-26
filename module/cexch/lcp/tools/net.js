
const fetch = require('node-fetch');
const https = require('https');

import fs from 'fs'
var FormData  = require('form-data');

//FIXME: for test: self signed certificate
const httpsAgent = new https.Agent({rejectUnauthorized: false,});

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

/*async function _get_file(file)
{
  return await fetch(file.uri)
         .then(r => r.blob())
         .then(blobFile => new File([blobFile], file.name, {type: file.type}));
}*/

async function req2(prop)
{
  let https = prop.url.includes('https://')?true:false;  //FIXME: for self signed cert only

  //let file = await _get_file(prop.file);

  var body = new FormData();

  body.append('file', fs.createReadStream(prop.file));
  body.append('data', JSON.stringify(prop.data));

  try {
    let response = await fetch(prop.url, {
      method: prop.method,
      body: body,
      agent: https?httpsAgent:null
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

async function run2(param, proxy_url, name)
{
  let prop = {
    method: 'POST',
    url: proxy_url+name,
    data: {
      auth: param.auth,
      param: param.param
    },
    file: param.file
  }

  let ret = await req2(prop);

  return ret;
}

const NET = {
  req:	req,
  run:	run,
  run2:	run2,
  req2:	req2
}

export default NET
