import S from './data/set'

async function _main()
{
  if(process.argv.length != 5) {
    console.log("usage: npm test <scenario_file>  <dstype = [online, offline]> <num>");
    process.exit();
  }

  console.log(process.argv[3]);

  let Test = require(process.argv[2]);

  Test(process.argv[3], process.argv[4]);

  //S.download("corner/uri");
  //S.url2file("corner/uri", "corner/file");
}

/*function _main()
{
  var fs = require('fs');
  var n = require('./data/corner/db.names');

  let t = JSON.parse(fs.readFileSync('./data/corner/pii.json', 'utf8'));

  
  console.log(t.length, n.length);

  console.log(JSON.stringify(t[0], 0, '  '));

  for(let i = 0; i<t.length; i++) {
    t[i].pii.name = n[Math.floor(Math.random()*n.length)];
    t[i].pii.fname = n[Math.floor(Math.random()*n.length)];
    t[i].pii.mname = n[Math.floor(Math.random()*n.length)];
    t[i].pii.mfname = n[Math.floor(Math.random()*n.length)];
    t[i].pii.gfname = n[Math.floor(Math.random()*n.length)];
  }

  console.log(JSON.stringify(t));
}*/

_main();

