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
    "name": "notif",
    "desc": "EMR notif micro service",
    "host": "127.0.0.1:26008",
    "address": {
      "phone_number": "0911161616",
      "email": "notif@bokri.xyz"
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
    "name": "mru",
    "desc": "MRU micro service",
    "host": "127.0.0.1:26001",
    "address": {
      "phone_number": "0911101010",
      "email": "mru@bokri.xyz"
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
    "name": "infotics",
    "desc": "Informatics micro service",
    "host": "127.0.0.1:26004",
    "address": {
      "phone_number": "0911133133",
      "email": "infotics@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access"
  ]
},
{
 "sii": {
    "name": "practner",
    "desc": "Practitioner micro service",
    "host": "127.0.0.1:26003",
    "address": {
      "phone_number": "0911121212",
      "email": "practner@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/app/emr/mru/patient/assert",
    "/app/emr/mru/patient/read",
    "/app/emr/infotics/idata/assert",
    "/app/emr/infotics/idata/read",
    "/app/emr/notif/write",
    "/app/emr/notif/read"
  ]
},
{
  "sii": { 
    "name": "triage",
    "desc": "Triage micro service",
    "host": "127.0.0.1:26002",
    "address": {
      "phone_number": "0911141414",
      "email": "triage@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/app/emr/mru/patient/assert",
    "/app/emr/mru/patient/read",
    "/platform/stream/open",
    "/platform/stream/close",
    "/app/emr/triage/stats/join",
    "/app/emr/triage/stats/exit",
    "/app/emr/practner/opd/assert",
    "/app/emr/practner/opd/read",
    "/app/emr/mru/patient/lastVisit/update",
    "/app/emr/notif/write",
    "/app/emr/notif/read",
    "/app/emr/triage/search/join",
    "/app/emr/triage/search/exit"
  ]
},
{
  "sii": {
    "name": "finance",
    "desc": "EMR finance micro service",
    "host": "127.0.0.1:26007",
    "address": {
      "phone_number": "0911161617",
      "email": "finance@bokri.xyz"
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
    "name": "lab",
    "desc": "EMR lab micro service",
    "host": "127.0.0.1:26005",
    "address": {
      "phone_number": "0911161677",
      "email": "lab@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "/app/emr/mru/patient/assert",
    "/app/emr/practner/patient/record/order/read",
    "/app/emr/notif/write",
    "/app/emr/notif/read"
  ]
},
{
  "sii": {
    "name": "pharmacy",
    "desc": "EMR pharmacy micro service",
    "host": "127.0.0.1:26006",
    "address": {
      "phone_number": "0911161688",
      "email": "pharmacy@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/users/person",
    "/platform/auth/users/access",
    "app/emr/mru/patient/assert",
    "/app/emr/notif/read"
  ]
},
{
  "sii": {
    "name": "admin",
    "desc": "Admin micro service",
    "host": "127.0.0.1:26010",
    "address": {
      "phone_number": "0911151515",
      "email": "admin@bokri.xyz"
    }
  },
  "caps": [
    "/platform/auth/caps/list",
    "/platform/auth/caps/allow",
    "/platform/auth/caps/revoke",
    "/platform/auth/users/access/write",
    "/platform/auth/users/access/delete",
    "/app/emr/mru/user/write",
    "/app/emr/mru/user/read",
    "/app/emr/mru/user/delete",
    "/app/emr/mru/user/update",
    "/app/emr/mru/user/list",
    "/app/emr/practner/user/write",
    "/app/emr/practner/user/read",
    "/app/emr/practner/user/delete",
    "/app/emr/practner/user/update",
    "/app/emr/infotics/user/write",
    "/app/emr/infotics/user/read",
    "/app/emr/infotics/user/list",
    "/app/emr/infotics/user/delete",
    "/app/emr/infotics/user/update",
    "/app/emr/lab/user/write",
    "/app/emr/lab/user/delete",
    "/app/emr/lab/user/update",
    "/app/emr/lab/user/read",
    "/app/emr/lab/user/list",
    "/app/emr/pharmacy/user/write",
    "/app/emr/pharmacy/user/read",
    "/app/emr/pharmacy/user/update",
    "/app/emr/pharmacy/user/delete",
    "/app/emr/pharmacy/user/list",
    "/app/emr/finance/user/delete",
    "/app/emr/finance/user/write",
    "/app/emr/finance/user/read",
    "/app/emr/finance/user/update",
    "/app/emr/finance/user/list",
    "/app/emr/triage/user/update",
    "/app/emr/triage/user/read",
    "/app/emr/triage/user/write",
    "/app/emr/triage/user/delete",
    "/app/emr/triage/user/list"
  ]
},
{
  "sii": {
    "name": "payment",
    "desc": "EMR payment micro service",
    "host": "127.0.0.1:26009",
    "address": {
      "phone_number": "0911167733",
      "email": "payment@bokri.xyz"
    }
  },
  "caps": [
    "/app/emr/finance",
  ]
},
];
