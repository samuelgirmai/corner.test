const fs = require('fs');
const readline = require('readline');

const MODEL  = require('./core/model');
const loader = require('./core/core');

let data_set = [];

let rstream = fs.createReadStream('./data/exported.csv');
rstream.setEncoding('utf16le');

let reader = readline.createInterface({
    input: rstream
});

let count = 0;

reader.on('line', async function (data) {

  let row = data.split(',');
  let p = new  MODEL.Patient();

  row.forEach(function(val, i){
    let field = MODEL.cols[i];
    
    if(p.pii.hasOwnProperty(field)){
      
      if(field == 'dob'){
        p.pii[field] = format_date(val);
      }else{
        p.pii[field] = val;
      }
    }else if(p.pii.address.hasOwnProperty(field)){
      p.pii.address[field] = val;
    }else if(field == 'mrn'){
      if(val.length == 5){
        p[field] = '0'+val;
      }else{
        p[field] = val;
      }
    }else if(field == 'date'){
      p[field] = dateto_timestamp(val);
    }
  });

  data_set.push(p);
});

function format_date(date){
  let d = date.split(' ')[0].split('-');

  return `${d[2]}/${d[1]}/${d[0]}`;
}

function dateto_timestamp(date){
  
  return new Date(date).getTime();
}


reader.on('close', function(){
  // fs.writeFileSync('exported.json',JSON.stringify(data_set, null, 2));
  // console.log(`Total parsed data ${data_set.length}`);
  loader(data_set);
});

