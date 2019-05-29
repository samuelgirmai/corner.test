import API from '../api/api_rest';
import CONFIG from '../config/config'

class History {
  symptom = "caugh";
  diagnosis = "mild caugh observed";
  prescription = null;
}

export async function read_history(token)
{
  let data, ret;
 
  data = {
    auth: {
      token: "911879778733"
    },
    param: {}
  }

  ret = await API.read_history(data);

  console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

export async function write_history(token)
{
  let ret, data;

  data = {
    auth: {
      token: "911879778733"
    },
    param: {
      history: new History()
    }
  }

  ret = await API.write_history(data);

  console.log(JSON.stringify(ret, 0, '  '));

  return ret;
}

