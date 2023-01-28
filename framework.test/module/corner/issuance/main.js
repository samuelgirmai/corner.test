import {CTX_put} from '../../../core/logic'
const CORNER = require('libsdkeid');
var sdk = null;

async function open(arg)
{
  sdk = await CORNER.Open(arg.config);

  if(sdk < 0) {
    console.log(CORNER.Last_error());

    return null;
  }

  return true;
}

async function close(arg)
{
  let r = await CORNER.Close(sdk);

  if(r < 0) {
    console.log(CORNER.Last_error());

    return null;
  }

  return true;
}

async function change_passwd(arg)
{
  let r = await sdk.Change_secret(arg.secret);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}


async function create_person(arg)
{
  let r = await sdk.Create_person(arg.reg_id, arg.pii);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());

    return null;
  }

  return arg.reg_id;
}

async function create_issue(arg, ctx)
{
  //console.log("CREATE_ISSUE", JSON.stringify(arg, 0, '  '));
  let r = await sdk.Create_issue(arg.reg_id, arg.pii, arg.uri);

  if(r < 0) {
    console.log(JSON.stringify(arg, 0, '  '));

    console.log("SDK Error: ", sdk.Last_error());
    return null;
  }

  //console.log("CTX:::", ctx);
  await CTX_put(ctx, "reg_id", arg.reg_id);

  return arg.reg_id;
}

async function modify_issue(arg)
{
  //console.log("MODIFY::", arg.reg_id);
  let r = await sdk.Modify_issue(arg.reg_id, arg.pii, arg.uri);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
    return null;
  }

  return arg.reg_id;
}

async function remove_issue(arg, ctx)
{
  let r = await sdk.Remove_issue(arg.reg_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());

    return null;
  }

  return true;
}

async function get_person(arg)
{
  let r = await sdk.Get_person(arg.reg_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

async function modify_person(arg)
{
  let r = await sdk.Modify_person(arg.reg_id, arg.pii);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

async function remove_person(arg)
{
  let r = await sdk.Remove_person(arg.reg_id);
  
  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());

    return null;
  }

  return true;
}

async function create_person_photo(arg)
{
  let r = await sdk.Create_person_photo(arg.reg_id, arg.uri);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());

    return null;
  }

  return true;
}

async function modify_person_photo(arg)
{
  let r = await sdk.Modify_person_photo(arg.reg_id, arg.uri);

  if(r < 0) {
    console.log("SDK Error: ", ar.sdk.Last_error());

    return null;
  }

  return true;
}

async function list_person(arg, ctx)
{
  let r = await sdk.List_person(arg.state);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());

    return null;
  }

  //console.log("FIRST", r[0].reg_id);

  if(!r.length) {
    return null;
  }

  CTX_put(ctx, "reg_id", r[0].reg_id);

  return r[0].reg_id;
}

async function create_auth_person(arg)
{ 
  let r = await sdk.Create_auth_person(arg.reg_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

async function modify_auth_person(arg)
{
  let r = await sdk.Modify_auth_person(arg.reg_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

async function remove_auth_person(arg)
{
  let r = await sdk.Remove_auth_person(arg.reg_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

async function get_auth_person(arg)
{
  let r = await sdk.Get_auth_person(arg.user_id);

  if(r < 0) {
    console.log("SDK Error: ", sdk.Last_error());
  }
}

const I = {
  open:			open,
  create_issue:		create_issue,
  modify_issue:		modify_issue,
  remove_issue:		remove_issue,
  create_person:	create_person,
  create_person_photo:	create_person_photo,
  list_person:		list_person,
  remove_person:	remove_person
}

export default I
