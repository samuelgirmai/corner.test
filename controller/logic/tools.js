import fs from 'fs'

export async function read_license(name)
{
  let r;

  if(!fs.existsSync(__dirname+"/.client.lic")){
    return 0;
  }

  r = JSON.parse(fs.readFileSync(__dirname+"/.client.lic", 'utf8'));

  console.log(":::"+JSON.stringify(r, 0, '  '))

  if(name){
    return r[name];
  }

  return r
}

export async function write_license(l)
{
  if(!fs.existsSync(__dirname+"/.client.lic")){
    console.log(":::client.lic file not found");
    return 0;
  }

  if(!l.license || !l.name || !l.user_id){
    console.log(":::unknown client license format");
    return 0;
  }

  let r = await read_license(null);

  r[l.name] = {
    user_id: l.user_id,
    license: l.license
  }

  console.log(JSON.stringify(r, 0, '  '));

  fs.writeFileSync(__dirname+"/.client.lic", JSON.stringify(r, 0, '  '), 'utf8');

  return 1;
}

