async function create_patient(arg)
{
  console.log("@create_patient("+JSON.stringify(arg, 0, '  ')+")");

  return "ret create_patient()";
}

async function get_patient(arg)
{
  console.log("@get_patient("+JSON.stringify(arg, 0, '  ')+")");


  return "ret get_patient()"
}

async function create_cofficer(arg)
{
  console.log("@create_cofficer("+JSON.stringify(arg, 0, '  ')+")");

  return "ret create_cofficer()";
}

async function signin_cofficer(arg)
{
  console.log("@signin_cofficer("+JSON.stringify(arg, 0, '  ')+")");

  return "ret signin_cofficer()";
}

async function get_license()
{
  return "ret get_license()";
}

const MRU = {
  create_patient: create_patient,
  get_patient: get_patient,
  create_cofficer: create_cofficer,
  signin_cofficer: signin_cofficer,
  get_license: get_license
}

export default MRU;
