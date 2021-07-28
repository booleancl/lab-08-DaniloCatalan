function expect(testValue) {
  // OJO en algo muy interesante en este objeto literal. Utilizan el valor testValue. ¿Por qué nos debería llamar la atención esto?
  const comparatorFunctions = {
    toEqual(expectedValue) {
      if (testValue !== expectedValue) {
        throw new Error()
      }
    },
    toHaveLength(expectedValue) {
      if (testValue.length !== expectedValue) {
        throw new Error()
      }
    },
  }
  // Esto permita que quien use expect pueda decidir el comparador que usa según sea el caso
  return comparatorFunctions
}

global.expect = expect
