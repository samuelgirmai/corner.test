import license from "./license.js";

const config = {
 auth: {
    license: license
  },
  proxy: {
    url: "https://corner.meninet.com:22000"
  },
  asset: {
    url: "https://corner.meninet.com:22009"
  },
  stream: {
    url: "https://corner.meninet.com:22003"
  }
};

export default config;

