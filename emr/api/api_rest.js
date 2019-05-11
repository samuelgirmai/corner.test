import API from './api'
import CONFIG from '../config/config'

exports.login = async(login) => {
  let prop = {
    method: 'POST',
    url: CONFIG.AUTH.URL+'/logins',
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
    url: CONFIG.AUTH.URL+'/logouts',
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

exports.read_history = async(info) => {

  let prop = {
    method: 'POST',
    url: CONFIG.EMR_HISTORY.URL+'/history',
    data: {
      info: info
    }
  }

  let ret = await API.request(prop);

  return ret;
}
exports.write_history = async(info) => {

  let prop = {
    method: 'POST',
    url: CONFIG.EMR_HISTORY.URL+'/history/add',
    data: {
      info: info
    }
  }

  let ret = await API.request(prop);

  return ret;
}

exports.get_stats = async(info) => {

  let prop = {
    method: 'POST',
    url: CONFIG.EMR_STATS.URL+'/stats',
    data: {
      info: info
    }
  }

  let ret = await API.request(prop);

  return ret;
}
  
