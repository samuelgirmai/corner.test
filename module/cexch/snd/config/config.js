import license from "./license.js";

const config = {
 auth: {
    license: license
  },
  proxy: {
    url: "http://localhost:22000"
  },
  stream: {
    url: "http://localhost:22003"
  }
};

export default config;

