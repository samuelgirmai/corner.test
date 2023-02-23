import fs from 'fs'
import https from 'https'
import crypto from 'crypto'

//IMPORT MODULE DATA HANDLERS HERE
//

var D = {
  corner:  require('./corner/index.js')
}

function Download(url)
{
  let cl;
  let remote = (url.includes('http://') || url.includes('https://')) ? 1 : 0

  if(!remote) {
    return url;
  }

  if(url.includes('https://')) {
    cl = https;
  }
  else {
    cl = http;
  }

  return new Promise((resolve, reject) => {
    cl.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream('./data/corner/photos/'+crypto.createHash('md5').update(url).digest('hex')))
        .on('error', reject)
        .once('close', () => resolve('./data/corner/photos/'+crypto.createHash('md5').update(url).digest('hex')));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

async function download(type)
{
  let t, i;

  t = JSON.parse(fs.readFileSync('./data/'+type+'.json', 'utf8'));

  for(let i = 0; i<t.length; i++) {
    console.log('downloading..', i, t[i].uri);

    await Download(t[i].uri);
  }
}

async function url2file(inp, out)
{
  let t, i, l = [], o;

  t = JSON.parse(fs.readFileSync('./data/'+inp+'.json', 'utf8'));

  for(let i = 0; i<t.length; i++) {
    o = t[i];
    o.uri = './data/corner/photos/'+crypto.createHash('md5').update(t[i].uri).digest('hex');

    l.push(o);
  }

  fs.writeFileSync('./data/'+out+'.json', JSON.stringify(l))
}

async function select(module, type)
{
  let t, i;
  //console.log(":::", Object.keys(D[module]['default']));

  t = await (D[module]['default'][type])();

  //console.log(JSON.stringify(t, 0, ' '))

  return t;
  //t = JSON.parse(fs.readFileSync('./data/'+type+'.json', 'utf8'));

  //i = Math.floor(Math.random()*t.length);

  //return t[i];
}

const S = {
  select:	select,
  download:	download,
  url2file:	url2file
}

export default S;
