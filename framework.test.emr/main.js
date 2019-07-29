async function _main()
{
  if(process.argv.length != 3){
    console.log("usage: npm test scenario_file");
    process.exit();
  }

  let Test = require(process.argv[2]);

  Test();
}

_main();

