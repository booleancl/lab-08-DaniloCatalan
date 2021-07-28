const {eventsController, events} = require('../SUT/controllers/events.controller')

/*
  Doble de prueba

  Stub --> solo reemplaza el comportamiento para que la prueba siga
  Mock --> reemplaza el comportamiento y además hacemos aserciones sobre el
*/

test('Jest functions for create Mocks and Stubs in real case: jest.fn()', () => {
  /*
    PREPARACIÓN: ARRANGE

    Método a probar: eventController.getEvents
    Requisitos:
      1 - pasar un objeto "req" que contenga:
          * headers.Authorization
          * logger un objeto con métodos Info() y log(). Notar que se utiliza "Fluent Interface"
          más detalles acá: https://en.wikipedia.org/wiki/Fluent_interface#JavaScript
          * los atributos "sessionId" y "username"

      2 - pasar un objeto "res" que contenga:
          * Un objeto res que contenga los métodos status() y json(). También utilizando "Fluent Interface"
  */
  const req = {
    username: 'dummy@usermail.com',
    sessionId: '33487074f3ffde1648d9b93113c7ed5309fafc3d',
    
    // Acá hay un error
    headers: {
      Authorization: 'Bearer 7bd1200dae1c9cf712478a160355655944f91cbe'
      },

    logger: {
      Info: jest.fn().mockImplementation(function(){
        return this
      }),
      log: jest.fn().mockImplementation(function(){
        return this
      })
    }
  }
  const res = {
    status: jest.fn().mockImplementation(function(){
      return this
    }),
    json: jest.fn().mockImplementation(function(){
      return this
    })
  }

  /* EJECUCIÓN: ACT */
  eventsController.getEvents(req, res)

  /*
    ASERCIÓN: ASSERT
    Como NO nos interesa el valor de retorno sino que si las funciones que ejecutan la funcionalidad fueron llamadas, las aserciones corroboran si se llamaron con los argumentos correctos
  */
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith(events)
})
