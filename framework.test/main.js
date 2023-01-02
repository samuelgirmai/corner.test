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

_main();

