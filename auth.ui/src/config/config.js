import license from "./license.js";

const config = {
 auth: {
    license: license
  },
  proxy: {
    url: "http://0.0.0.0:22000"
    //url: "http://rufta.cornerhealth.io:22000"
  },
  stream: {
    //url: "http://0.0.0.0:22003"
    url: "http://rufta.cornerhealth.io:22003"
  }
};

export default config;

