let cols = [
    'mrn',
    'name',
    'fname',
    'gfname',
    'gender',
    'dob',
    'kebele',
    'phone_number',
    'woreda'
]

class Patient {
  constructor() {
    this.pii = new Pii()
  }
}

class Pii {
  constructor() {
    this.name = '',
    this.fname = '',
    this.gfname = '',
    this.mname = '',
    this.mfname = '',
    this.gfname = '',
    this.gender = '',
    this.dob = '',
    this.address = new Address();
  }
}

class Address {
  constructor() {
      this.region = '',
      this.zone = '',
      this.woreda = '',
      this.kebele = '',
      this.house_number = '',
      this.phone_number = '';
  }
}
module.exports = {
    cols: cols,
    Patient: Patient,
}