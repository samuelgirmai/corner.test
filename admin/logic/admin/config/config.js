import license from './license.js'

const config = {
 auth: {
    license: license
  },
  proxy: {
    //url: "https://corner.meninet.com:22000",
    url: "https://0.0.0.0:22000"
  },
  stream: {
    url: "https://corner.meninet.com:22003"
  }
};
export default config;

