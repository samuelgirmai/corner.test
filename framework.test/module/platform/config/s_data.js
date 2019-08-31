export const services = [
{
  "sii": {
    "name": "p.stream",
    "desc": "platform stream api micro service",
    "host": "127.0.0.1:22002",
    "address": {
      "phone_number": "0911161628",
      "email": "p.streamapi@bokri.xyz"
    }
  },
  "caps": []
},
{
  "sii": {
    "name": "p.stream.core",
    "desc": "platform stream core micro service",
    "host": "127.0.0.1:22003",
    "address": {
      "phone_number": "0911161675",
      "email": "p.streamcore@bokri.xyz"
    }
  },
  "caps": []
},
{
  "sii": {
    "name": "p.notif",
    "desc": "platform notif api",
    "host": "127.0.0.1:22004",
    "address": {
      "phone_number": "0911161631",
      "email": "p.notif@bokri.xyz"
    }
  },
  "caps": [
    "/platform/stream/open",
    "/platform/stream/close",
    "/platform/notif/join",
    "/platform/notif/exit",
  ]
},
{
 "sii": {
    "name": "emr.mru",
    "desc": "MRU micro service",
    "host": "127.0.0.1:26001",
    "address": {
      "phone_number": "0911101010",
      "email": "emr.mru@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/mru/stats/join",
    "/app/emr/mru/stats/exit",
    "/app/emr/mru/search/join",
    "/app/emr/mru/search/exit",
  ]
},
{
 "sii": {
    "name": "emr.practner",
    "desc": "Practitioner micro service",
    "host": "127.0.0.1:26003",
    "address": {
      "phone_number": "0911121212",
      "email": "emr.practner@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/app/emr/mru/patient/assert"
  ]
},
{
  "sii": {
    "name": "emr.infotics",
    "desc": "Informatics micro service",
    "host": "127.0.0.1:26004",
    "address": {
      "phone_number": "0911133133",
      "email": "emr.infotics@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access"
  ]
},
{
  "sii": { 
    "name": "emr.triage",
    "desc": "Triage micro service",
    "host": "127.0.0.1:26002",
    "address": {
      "phone_number": "0911141414",
      "email": "emr.triage@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/app/emr/mru/patient/assert",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/triage/stats/join",
    "/app/emr/triage/stats/exit",
  ]
},
{
  "sii": {
    "name": "emr.notif",
    "desc": "EMR notif micro service",
    "host": "127.0.0.1:26008",
    "address": {
      "phone_number": "0911161616",
      "email": "emr.notif@bokri.xyz"
    }
  },
  "caps": [
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/notif/join",
    "/app/emr/notif/exit",
  ]
},
{
  "sii": {
    "name": "emr.finance",
    "desc": "EMR finance micro service",
    "host": "127.0.0.1:26007",
    "address": {
      "phone_number": "0911161617",
      "email": "emr.finance@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access"
  ]
},
{
  "sii": {
    "name": "emr.lab",
    "desc": "EMR lab micro service",
    "host": "127.0.0.1:26005",
    "address": {
      "phone_number": "0911161677",
      "email": "emr.stats@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "app/emr/mru/patient/assert"
  ]
},
{
  "sii": {
    "name": "emr.pharmacy",
    "desc": "EMR pharmacy micro service",
    "host": "127.0.0.1:26006",
    "address": {
      "phone_number": "0911161688",
      "email": "emr.pharmacy@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "app/emr/mru/patient/assert"
  ]
},
{
  "sii": {
    "name": "emr.admin",
    "desc": "Admin micro service",
    "host": "127.0.0.1:22005",
    "address": {
      "phone_number": "0911151515",
      "email": "emr.admin@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/caps/list",
    "/platform/auth/caps/allow",
    "/platform/auth/caps/revoke",
    "/app/emr/mru/user/write",
    "/app/emr/mru/user/read",
    "/app/emr/mru/user/delete",
    "/app/emr/mru/user/update",
  ]
},
];
