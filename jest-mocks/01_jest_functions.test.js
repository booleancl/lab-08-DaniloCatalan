/*
  Referencia:
  https://jestjs.io/docs/mock-function-api
*/

test('jest.fn() returns value with mockReturnValue and mockReturnValueOnce', () => {
  const jestFunction = jest.fn() //<--retorna una función

  //console.log(jestFunction.toString()) // <-- que pasa con toString
  //console.log(jestFunction())

  // Podemos configurarla para retornar muchos tipos de valores

  //  jestFunction.mockReturnValue(1)
  //  console.log(jestFunction('https://api.boolean.cl/v1/students'))
  // console.log(jestFunction())
  // //console.log(jestFunction())
  
  // //expect(jestFunction).toHaveBeenCalledTimes(2)
  // expect(jestFunction).toHaveBeenCalledWith('https://api.boolean.cl/v1/students')

  // jestFunction
  //   .mockReturnValueOnce(1)
  //   .mockReturnValueOnce(2)
  //   .mockReturnValueOnce(3)

  // console.log(jestFunction())
  // console.log(jestFunction())
  // console.log(jestFunction())

  jestFunction
    .mockReturnValue('default')
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(2)

  console.log(jestFunction())
  console.log(jestFunction())
  console.log(jestFunction())
  console.log(jestFunction())

})

test('jest.fn() returns values for resolve and reject for replace methods that relies in promises', async () => {
  //const jestFunction = jest.fn()

  //jestFunction.mockResolvedValue({ id: 1, username: 'miles1986' })
  //jestFunction.mockReturnValue(Promise.resolve({ id: 1, username: 'miles1986' }))
  //console.log(jestFunction())

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  // DESAFÍO: Transformar en async/await
  
  // const resolvedValue = await jestFunction()
    
  // expect(resolvedValue).toEqual({ id: 1, username: 'miles1986' })
  


  const expectedError = new Error('User is not found')
  try {
    const jestFunction = jest.fn()
    jestFunction.mockRejectedValue(expectedError)
    await jestFunction()
  } catch(error) {
      console.log('Esto no pasará en un caso real de pruebas porque es el código fuente el que debe implementar el bloque try/catch')
      console.log(error)
  }
})

