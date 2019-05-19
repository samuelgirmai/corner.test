import fetch from '../node_modules/node-fetch/lib/index.js'

exports.request = async (prop) => {
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
  } else {
    throw new Error(response.status + " " + response._bodyText);
  }
}
