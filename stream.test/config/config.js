const config = {
  auth0: {
    license: "C"
  },
  auth1: {
    license: "D"
  },
  auth2: {
    license: "E"
  },
  auth3: {
    license: "F"
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
    port: 5560,
    host: "0.0.0.0"
  }
}

export default config;

