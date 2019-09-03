async function _main()
{
  if(process.argv.length != 4){
    console.log("usage: npm test <scenario_file>  <num>");
    process.exit();
  }

  let Test = require(process.argv[2]);

  Test(process.argv[3]);
}

_main();

