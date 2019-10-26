const configs = {
  home: "/home/samuel/current_tasks/personal/bokri/corner.backend",
  conf: [
    /*{
      file: "/config/config.json",
      proxy: {
        url: "http://127.0.0.1:22000"
      },
      stream: {
        url: "http://127.0.0.1:22003"
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: "0.0.0.0"
      }
    },
    {
      file: "/boot/config/config.json",
      api: {
        host: "127.0.0.1",
        port: 21000
      },
      master: {
        is: true,
        url: "http://127.0.0.1:21000"
      }
    },
    {
      file: "/fs/tools/config/config.json",
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/admin/config/config.json",
      api: {
        port: 26010,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/infotics/config/config.json",
      api: {
        port: 26004,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/notif/config/config.json",
      api: {
        port: 26010,
        host: "",
      },
      stream: {
        "url": "http://127.0.0.1:22003"
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/pharmacy/config/config.json",
      api: {
        port: 26007,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/storeSimulator/config/config.json",
      api: {
        port: 27001,
        host: "",
      },
      proxy: {
        url: ""
      }
    },
    {
      file: "/services/emr/finance/config/config.json",
      api: {
        port: 26007,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/lab/config/config.json",
      api: {
        port: 26005,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/mru/config/config.json",
      api: {
        port: 26001,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/payment/config/config.json",
      api: {
        port: 26006,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/practner/config/config.json",
      api: {
        port: 26003,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/services/emr/triage/config/config.json",
      api: {
        port: 26002,
        host: "",
      },
      proxy: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/platform/muxer/config/config.json",
      api: {
        host: "",
        port: 22000
      },
      assert: {
        cap: "/platform/auth/assert",
        url: ""
      }
    },*/
    {
      file: "/platform/auth/config/config.json",
      api: {
        port: 22001,
        host: "localhost"
      },
      proxy: {
        url: "http://127.0.0.1:22000"
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: "0.0.0.0"
      }
    },
    /*{
      file: "/platform/notif/config/config.json",
      api: {
        port: 22004,
        host: "",
      },
      proxy: {
        url: ""
      },
      stream: {
        url: ""
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      }
    },
    {
      file: "/platform/stream/config/config.json",
      api: {
        port: 22002,
        host: "",
      },
      proxy: {
        url: ""
      },
      stream: {
        port: 22003,
        host: "",
      },
      fs: {
        name: "rethinkdb",
        port: 28015,
        host: ""
      },
      assert: {
        cap: "/platform/auth/assert",
        url: ""
      }
    }*/
  ]
}

export default configs
