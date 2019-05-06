import ACCOUNT from './account'

async function _start()
{
   await ACCOUNT.main();

   _start();
}
_start();

