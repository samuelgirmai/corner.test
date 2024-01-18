import fs from 'fs'
import randomstring from 'randomstring';

//var uri = JSON.parse(fs.readFileSync('data/corner/uri.json', 'utf8'));
var uri = JSON.parse(fs.readFileSync('data/corner/uri.json', 'utf8'));
var pii = JSON.parse(fs.readFileSync('data/corner/pii.json', 'utf8'));
//var reg_id = JSON.parse(fs.readFileSync('data/corner/reg_id.json', 'utf8'));

var names = require('./db.names');
var tigrai = require('./tigrai').default;

async function get_pii()
{
  var p = {pii:{address:{}}};// = pii[Math.floor(Math.random()*pii.length)];

  p.pii["name"] = names[Math.floor(Math.random()*names.length)];
  p.pii["fname"] = names[Math.floor(Math.random()*names.length)];
  p.pii["mname"] = names[Math.floor(Math.random()*names.length)];
  p.pii["mfname"] = names[Math.floor(Math.random()*names.length)];
  p.pii["gfname"] = names[Math.floor(Math.random()*names.length)];

  let i = Math.random();

  p.pii["gender"] = Math.floor(i*2) ? "M" : "F";
  p.pii["dob"] = Math.floor(i*28).toString()+"/"+Math.floor(i*12).toString()+"/"+(1920+Math.floor(i*88)).toString();
 
  p.pii.address["phone_number"] = "+2519"+randomstring.generate({length: 8 , charset: 'numeric'});

  p.pii.address["region"] = "ትግራይ";
  p.pii.address["woreda"] = (tigrai[p.pii.address["region"]][Math.floor(i*tigrai[p.pii.address["region"]].length)]).value;
  p.pii.address["tabiya"] = (tigrai[p.pii.address["woreda"]][Math.floor(i*tigrai[p.pii.address["woreda"]].length)]).value;;

  //console.log(p.pii.address);
  return p;
}

async function get_reg_id()
{
  return {
    reg_id: randomstring.generate({length: 10 , charset: 'numeric'})
  }
}

async function get_uri()
{
  return uri[Math.floor(Math.random()*uri.length)];
}

const D = {
  pii: get_pii,
  reg_id: get_reg_id,
  uri: get_uri
}

export default D;
