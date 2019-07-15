const config = {
 auth: {
    license: "520099654961"
  },
  proxy: {
    url: "http://127.0.0.1:22000",
  },
  stream: {
    url: "http://localhost:22003"
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

