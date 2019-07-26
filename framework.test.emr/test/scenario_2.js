import MRU from '../module/emr/mru/mru'

export const scenario_2 = {
  _start: {
    cb: MRU.create_patient,
    arg: [
      {
        type: "func",
        name: "token",
        data: "signin_cofficer"
      },
      {
        type: "var",
        name: "pii",
        data: 'pii'
      }
    ]
  },
  signin_cofficer: {
    cb: MRU.signin_cofficer,
    arg: [
      {
        type: "const",
        name: "security",
        data: {
          username: "cofficer1",
          password: "hello@123"
        }
      }
    ]
  },
}

