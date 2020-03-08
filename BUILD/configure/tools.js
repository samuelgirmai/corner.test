import fs from 'fs'

var license_dir = "/home/samuel/current_tasks/personal/bokri/corner/clients/controller/logic"

export async function read_license(name)
{
  let r;

  if(!fs.existsSync(license_dir+"/.licenses")){
    console.log(":::>>> license file not found");
    return 0;
  }

  r = JSON.parse(fs.readFileSync(license_dir+"/.licenses", 'utf8'));

  if(name){
    return r[name];
  }

  return r
}

export async function write_license(name, lfile)
{
  let r, l;

  if(!fs.existsSync(license_dir+"/.licenses") || !fs.existsSync(lfile)){
    console.log(":::>>> licenses file not found");
    return 0;
  }

  l = "const license = \""+(await read_license(name)).license+"\";\n\nexport default license;";

  await fs.writeFileSync(lfile, l, 'utf8');

  return 1;
}

