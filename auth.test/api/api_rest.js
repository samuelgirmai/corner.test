import API from './api'
import CONFIG from '../config/config'

exports.signin = async(param) => {
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/platform/auth/p_signin',
    data: param
  }
  let ret = await API.request(prop);

  return ret;
}

exports.logout = async(param) => {
 
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/platform/auth/p_logout',
    data: param
  }

  let ret = await API.request(prop);

  return ret;
}

exports.signup = async(param) => {
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/platform/auth/p_signup',
    data: param
  }

  let ret = await API.request(prop);

  return ret;
}

exports.signout = async(param) => {
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/platform/auth/p_signout',
    data: param
  }

  let ret = await API.request(prop);

  return ret;
}

exports.read_history = async(param) => {
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/app/emr/history/read',
    data: param
  }

  let ret = await API.request(prop);

  return ret;
}

exports.write_history = async(param) => {
  let prop = {
    method: 'POST',
    url: CONFIG.PROXY_URL+'/app/emr/history/write',
    data: param
  }

  let ret = await API.request(prop);

  return ret;
}

