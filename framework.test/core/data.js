import NET from '../net/api'

async function Mockaroo(type)
{
  let prop = {
    method: 'GET',
    url: 'https://my.api.mockaroo.com/corner/'+type+'?key=87829bf0',
    data: null
  }

  let ret = await NET.request(prop);

  //console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

export async function Data(type)
{
  console.log("fetching data (%s) ...", type);

  return await Mockaroo(type);
}

