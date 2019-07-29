import MRU from '../module/emr/mru/mru'

module.exports = {
  _start: {
    cb: MRU.get_stats,
    arg: [
      {
        type: "func",
        name: "license",
        data: "get_license"
      }
    ]
  },
  get_license: {
    cb: MRU.get_license,
    arg: []
  }
}

//export default scenario;
