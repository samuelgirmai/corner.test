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

/*
    let r;

    r = await SCANNER.open_scanner();

    //alert(JSON.stringify(r, 0, '  '))

    if(r.status == "err"){
      alert("Scanner open failed!");
      return
    }

    r = await SCANNER.read_scanner(this.props.args.user_id);

    //alert(JSON.stringify(r, 0, '  '));

    if(r.status == "ok"){
      this.setState({
        blob: CONFIG.scanner.url+"/scan/feature?user_id="+this.props.args.user_id,
        img: CONFIG.scanner.url+"/scan/image?user_id="+this.props.args.user_id
      });
    }
    else {
      alert("Not Scanned: "+JSON.stringify(r, 0, '  '));
    }
*/
export async function scan_fingerprint(user_id)
{
  let data, ret;

  data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {}
  }

  console.log(CONFIG.scanner.url);

  ret = await API.run(data, CONFIG.scanner.url, "/scanner/open");

  _print(ret, null);

  /*if(ret.status == "err") {
    return;
  }*/

  data = {
    auth: {
      license: CONFIG.auth.license
    },
    param: {
      user_id: user_id
    }
  }

  ret = await API.run(data, CONFIG.scanner.url, "/scanner/read");

  _print(ret, null);
}


const S = {
  scan_fingerprint:	scan_fingerprint
};

export default S;

