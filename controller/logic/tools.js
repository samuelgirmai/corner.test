import fs from 'fs'

export async function read_license(name)
{
  let r;

  if(!fs.existsSync(__dirname+"/.licenses")){
    console.log(":::.licenses file not found");
    return 0;
  }

  r = JSON.parse(fs.readFileSync(__dirname+"/.licenses", 'utf8'));

  if(name){
    return r[name];
  }

  return r
}

export async function write_license(l)
{
  if(!fs.existsSync(__dirname+"/.licenses")){
    console.log(":::.licenses file not found");
    return 0;
  }

  if(!l.name || !l.user_id || !(l.license || l.password)){
    console.log(":::unknown license format");
    return 0;
  }

  let r = await read_license(null);

  if(l.license){
    r[l.name] = {
      user_id: l.user_id,
      license: l.license
    }
  }
  else if(l.password){
    r[l.name] = {
      user_id: l.user_id,
      password: l.password
    }
  }

  console.log(JSON.stringify(r, 0, '  '));

  fs.writeFileSync(__dirname+"/.licenses", JSON.stringify(r, 0, '  '), 'utf8');

  return 1;
}

