import randomstring from 'randomstring';

const Transfer = {
  exch_type: "USD_TO_BIRR",
  amount: 0.00,
  receiver: {
    pii: {
      name: "Samuel",
      fname: "Girmay",
      gfname: "Worota"
    },
    im: {
      app: "WHATSAPP",
      phone_number: "+251938408763"
    },
    bank: {
      country: "ETH",
      currency: "BIRR",
      name: "CBE",
      account_number: "1000066669029"
    }
  }
}

async function get_req()
{
  var p = Transfer;

  let i = Math.random();

  p.amount = Math.floor(500 + i*5000);

  return {req: p};
}

async function get_txid()
{
  return {
    txid: randomstring.generate({length: 12 , charset: 'numeric'})
  }
}

async function get_fragCnt()
{
  return {
    frag_cnt: Math.floor(1+Math.random()*5)
  }
}

const D = {
  req: get_req,
  txid: get_txid,
  frag_cnt: get_fragCnt
}

export default D;
