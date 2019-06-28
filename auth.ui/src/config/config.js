const config = {
 auth: {
    license: "522681061521"
  },
  proxy: {
    url: "http://127.0.0.1:9999",
  },
  stream: {
    url: "http://localhost:8890"
  },
  fs: {
    name: "rethinkdb",
    port: 28015,
    host: "0.0.0.0"
  },
  api: {
    port: 5561,
    host: "0.0.0.0"
  }
};

export default config;

