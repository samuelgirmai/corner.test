const URL_AUTH = 'http://127.0.0.1:3001';
const URL_ACCOUNT = 'http://127.0.0.1:3002';
const URL_EMR = 'http://127.0.0.1:5560';

const URI_STREAM='http://127.0.0.1:8890'

const auth = {
  URL: URL_AUTH+''
}
const account = {
  URL: URL_ACCOUNT+'/accounts'
}

const emr = {
  URL: URL_EMR+'/emr'
}

const stream = {
  URI: URI_STREAM
}

const config = {
  AUTH: auth,
  ACCOUNT: account,
  EMR: emr,
  STREAM: stream
}

export default config;

