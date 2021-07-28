class Student {
  constructor(name, lastName) {
    this.name = name
    this.lastName = lastName
    this.isAbsence = false
  }
  greet() {
    return `Hello I'm ${this.name} ${this.lastName}`
  }
  markAbsence(isAbsence) {
    this.isAbsence = isAbsence
  }
  canMarkAttendance() {
    return this.isAbsence === false
  }
}

module.exports = Student
