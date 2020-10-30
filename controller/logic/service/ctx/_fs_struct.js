let corner = [
  {
    "name": "corner",
    "file": [
      {
        "name": "cap",
        "index": [
          "desc",
        ]
      },
      {
        "name": "identity",
        "index": [
          "pii.name",
          "sii.name",
          "cii.name"
        ]
      },
      {
        "name": "user",
        "index": [
          "pii.name",
        ]
      },
      {
        "name": "access",
        "index": []
      },
      {
        "name": "financeAccount",
        "index": []
      },
      {
        "name": "insuranceScheme",
        "index": []
      },
      {
        "name": "transaction",
        "index": []
      },
      {
        "name": "serviceOrder",
        "index": []
      },
      {
        "name": "bill",
        "index": []
      },
      {
        "name": "notif",
        "index": []
      },
      {
        "name": "stats",
        "index": []
      },
      {
        "name": "prn",
        "index": []
      }      
    ]
  }
]

let boot = [
  {
    "name": "boot",
    "file": [
      {
        "name": "config",
        "index": [
          "name"
        ]
      },
      {
        "name": "password",
        "index": [
          "name",
        ]
      },
      {
        "name": "license",
        "index": [
          "name",
        ]
      } 
    ]
  }
]

let issuance = [
  {
    "name": "issuance",
    "file": [
      {
        "name": "identity",
        "index": [
          "pii.name"
        ]
      }
    ]
  }
]

module.exports = {
  boot: boot,
  corner: corner,
  issuance: issuance
}

