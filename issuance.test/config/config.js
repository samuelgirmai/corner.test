import license from "./license.js";

const config = {
 auth: {
    license: license
  },
  proxy: {
    url: "https://0.0.0.0:22000"
  },
  asset: {
    url: "https://localhost:22009"
  },
  stream: {
    url: "https://0.0.0.0:22003"
  }
};

export default config;

