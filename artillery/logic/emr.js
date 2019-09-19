'use strict';

var c = require('../config/config');

function get_auth(context, ee, done) 
{
  context.vars.auth = c.auth;

  return done();
}

function get_pii(context, ee, done)
{
  context.vars.param = {
    pii: {
      name: "Solomon",
      fname: "Leul",
      mname: "Zemzem",
      mfname: "Gidey",
      gender: "M",
      dob: "12/12/1999",
      address: {
        region: "Tigray",
        zone: "Debub",
        woreda: "Azebo",
        kebele: "11",
        house_number: "122",
        phone_number: "09"+Math.random().toString().slice(2,10)
      }
    }
  }
  
  return done(); 
}

function get_idata(context, ee, done)
{
  context.vars.param = {
    type: "allergy",
    data: {
      category: "Drug Allergy " ,
      name: "Adhesive tape" ,
      reaction: ["Cough"]
    }
  }
  return done();
   
}

function get_exam(context, ee, done)
{
  context.vars.exam = {
    repeat: false,
    chief_compliant: 'headache',
    allergy: [],
    vitalsign: []
  } 
  
  return done();  
}

function get_assign(context, ee, done)
{
  context.vars.status = 'Blue';

  return done();
}

function get_opd(context, ee, done)
{
  context.vars.dii = {
    catagory: 'test',
    name: 'pediatrics',
      address: {
      phone_number: "09"+Math.random().toString().slice(2,10)
    }
  }

  return done();
}

function get_result(context, ee, done)
{
  context.vars.result = {
    order: {
      catagory: 'default',
        type: {}
    }
  }

  return done();
}

function get_dispense(context, ee, done)
{
  context.vars.dispense = {
    info: {
      instruction: "one per day"
    }
  }

  return done();
}

/*
 * Just for Debugging
 */
function log_response(requestParams, response, context, ee, next)
{

  console.log('Log: ', response.body);

  next();
}

module.exports = {
  get_pii:      get_pii,
  get_auth:     get_auth,
  get_idata:    get_idata,
  get_result:   get_result,
  get_dispense: get_dispense,
  get_exam:     get_exam,
  get_assign:   get_assign,
  get_opd:      get_opd, 
  log_response: log_response
}
