import API from './api'
import CONFIG from '../config/config'

exports.login = async(login) => {
  let prop = {
    method: 'POST',
    url: CONFIG.ACCOUNT.URL+'/logins',
    data: {
      login: login
    }
  }
  let ret = await API.request(prop);

  return ret;
}

exports.logout = async(skey) => {
 
  let prop = {
    method: 'POST',
    url: CONFIG.ACCOUNT.URL+'/logouts',
    data: {
      skey: skey
    }
  }

  let ret = await API.request(prop);

  return ret;
}

exports.signup = async(signup) => {
  let prop = {
    method: 'POST',
    url: CONFIG.ACCOUNT.URL+'/signups',
    data: {
      signup: signup
    }
  }

  let ret = await API.request(prop);

  return ret;
}