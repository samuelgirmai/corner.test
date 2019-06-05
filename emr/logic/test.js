import API_STREAM from '../api/api_sock'

async function _start()
{
  await API_STREAM.init();
}

_start();
