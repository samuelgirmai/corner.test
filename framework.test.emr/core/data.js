import NET from '../net/api'

async function Mockaroo(type)
{
  let prop = {
    method: 'GET',
    url: 'https://my.api.mockaroo.com/corner/'+type+'?key=87829bf0',
    data: null
  }

  return await NET.request(prop);
}

export async function Data(type)
{
  console.log("fetching data (%s) ...", type);

  return await Mockaroo(type);
}

