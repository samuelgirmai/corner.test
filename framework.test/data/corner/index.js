import fs from 'fs'
import randomstring from 'randomstring';

var uri = JSON.parse(fs.readFileSync('data/corner/uri.json', 'utf8'));
var pii = JSON.parse(fs.readFileSync('data/corner/pii.json', 'utf8'));
//var reg_id = JSON.parse(fs.readFileSync('data/corner/reg_id.json', 'utf8'));

var names = require('./db.names');

async function get_pii()
{
  var p = pii[Math.floor(Math.random()*pii.length)];

  p.pii.name = names[Math.floor(Math.random()*names.length)];
  p.pii.fname = names[Math.floor(Math.random()*names.length)];
  p.pii.mname = names[Math.floor(Math.random()*names.length)];
  p.pii.mfname = names[Math.floor(Math.random()*names.length)];
  p.pii.gfname = names[Math.floor(Math.random()*names.length)];
  p.pii.address.phone_number = "+251"+randomstring.generate({length: 9 , charset: 'numeric'});

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
