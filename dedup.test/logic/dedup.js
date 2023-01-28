import API from '../tools/net'
import CONFIG from '../config/config'

function _print(o, key)
{
  if(o.status == "err"){
    console.log(JSON.stringify(o, 0, '  '));

    return;
  }

  if(o.key){
    console.log(JSON.stringify(o.result[key], 0, '  '));

    return;
  }

  /*if(o.result){
    console.log(JSON.stringify(o.result, 0, '  '));

    return;
  }*/

  console.log(JSON.stringify(o, 0, '  '));
}

export async function dedup_person(token, p)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: p/*{/
      pii: p.pii,
      atype: p.atype,
      ntype: p.ntype,
      depth: p.depth
    }*/
  }

  //alert(JSON.stringify(p, 0, '  '));

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dedup/identity/person/duplicate/run');

  _print(ret, null);
}

export async function signin(p)
{
  let data = {
    auth: {
      license: CONFIG.auth.license,
    },
    param: {
      username: p.username,
      password: p.password
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dedup/user/access/write');

  _print(ret, 'token');

   return ret.status == "ok"?ret.result.token: null
}

export async function signout(token)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      token: token
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dedup/user/access/delete');

  _print(ret, null);
}

export async function change_passwd(token, p)
{
  if(!token){
    console.log('   [!] not logged in?');
    return;
  }

  let data = {
    auth: {
      token: token,
    },
    param: {
      username: p.username,
      oldpassword: p.oldpassword,
      newpassword: p.newpassword
    }
  }

  let ret = await API.run(data, CONFIG.proxy.url, '/platform/dedup/user/security/update');

  _print(ret, null);
}

const D = {
  /*security*/
  signin:		signin,
  signout:		signout,
  change_passwd:	change_passwd,

  /*logic*/
  dedup_person:		dedup_person
};

export default D;

