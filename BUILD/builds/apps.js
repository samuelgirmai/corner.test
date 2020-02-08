export var apps = [
  /*{
    name: "launcher",
    version: "integrate13",
    mnt: "/launcher",
    bind: "0.0.0.0",
    port: 80
  },*/
  {
    name: "auth",
    version: "v1.1.qa",
    mnt: "/auth",
    bind: "0.0.0.0",
    port: 3000
  },
  {
    name: "rufta/mru",
    version: "v1.1.qa",
    mnt: "/rufta/mru",
    bind: "0.0.0.0",
    port: 3001
  }
  {
    name: "rufta/admin",
    version: "v1.1.qa",
    mnt: "/rufta/admin",
    bind: "0.0.0.0",
    port: 3002
  }
]
