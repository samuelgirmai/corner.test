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

let finance = [
  {
    "name": "finance",
    "file": [
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
  corner: corner,
  finance: finance,
  issuance: issuance
}

