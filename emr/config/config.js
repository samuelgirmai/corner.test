const URL_AUTH = 'http://127.0.0.1:3001';
const URL_ACCOUNT = 'http://127.0.0.1:3002';
const URL_EMR_HISTORY = 'http://127.0.0.1:5560';
const URL_EMR_STATS = 'http://127.0.0.1:5561';

const URI_STREAM='http://127.0.0.1:8890'

const auth = {
  URL: URL_AUTH+'/platform/auth/v1'
}
const account = {
  URL: URL_ACCOUNT+'/platform/accounts/v1'
}

const emr_history = {
  URL: URL_EMR_HISTORY+'/app/emr/v1'
}

const emr_stats = {
  URL: URL_EMR_STATS+'/app/emr/v1'
}

const stream = {
  URI: URI_STREAM
}

const config = {
  AUTH: auth,
  ACCOUNT: account,
  EMR_STATS: emr_stats,
  EMR_HISTORY: emr_history,
  STREAM: stream
}

export default config;

