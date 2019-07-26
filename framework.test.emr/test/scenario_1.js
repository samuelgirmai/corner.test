import MRU from '../module/emr/mru/mru'

export const scenario_1 = {
  _start: {
    cb: MRU.get_patient,
    arg: [
      {
        type: "func",
        name: "user_id",
        data: "create_patient"
      },
    ]
  },
  create_patient: {
    cb: MRU.create_patient,
    arg: [
      {
        type: "func",
        name: "token",
        data: "signin_cofficer"
      },
      {
        type: "data",
        name: "pii",
        data: 'pii'
      }
    ]
  },
  signin_cofficer: {
    cb: MRU.signin_cofficer,
    arg: [
      {
        type: "func",
        name: "security",
        data: "create_cofficer"
      }
    ]
  },
  create_cofficer: {
    cb: MRU.create_cofficer,
    arg: [
      {
        type: "data",
        name: "pii",
        data: "pii"
      }
    ]
  }
}

