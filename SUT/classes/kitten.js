class Kitten {
  constructor() {
    this.name = 'Garfield';
    this.color = 'orange';
  }

  setName(name) {
    this.name = name;
  }

  setColor(color) {
    this.color = color;
  }

  save() {
    console.log(
      `saving ${this.name}, the ${this.color} kitten`
    );
  }
}

module.exports = Kitten
