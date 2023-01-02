import NET from '../net/api'
import OFF from '../data/set'

async function Mockaroo(type)
{
  let prop = {
    method: 'GET',
    url: 'https://my.api.mockaroo.com/corner/'+type+'?key=8bdfe090',
    data: null
  }

  let ret = await NET.request(prop);

  //console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

async function Offline(type)
{
  let ret = await OFF.select('corner/'+type);

  return ret;
}

export async function Data(dstype, type)
{
  console.log("fetching data(%s) . dataset type(%s)", type, dstype);

  if(dstype == 'online') {
    return await Mockaroo(type);
  }
  else if(dstype == 'offline'){
    return await Offline(type);
  }
  else {
    console.log("unknow dataset type options are [online, offline]");
    return []
  }
}

