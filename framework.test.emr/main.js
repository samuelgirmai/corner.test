import {
  Test
} from './core/logic'

async function _main()
{
  if(process.argv.length != 3){
    console.log("usage: npm test scenario_file");
    process.exit();
  }

  Test(require(process.argv[2]));
}

_main();

