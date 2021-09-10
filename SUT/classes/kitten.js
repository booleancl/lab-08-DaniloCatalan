class Kitten {
  constructor() {
    this.name = 'Garfield';
    this.color = 'orange';
  }

  setName(name) {
    this.name = name;
    return this

  }

  setColor(color) {
    this.color = color;
    return this
  }

  save() {
    console.log(
      `saving ${this.name}, the ${this.color} kitten`
    );
    return this

  }

}

module.exports = Kitten
