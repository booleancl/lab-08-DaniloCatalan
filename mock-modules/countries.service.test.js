// Debido a que axios expone métodos, extraemos solo el que necesitamos
const { get } = require('axios')
const countriesService = require('../SUT/services/countries.service')

/* Jest mock nos provee una función que es capaz de sustituir un módulo
  a la vez, esta sentencia es "hoisteada" por lo tanto una vez que importamos axios a través de require() este será el resultado de lo que devuelva el siquiente callback
*/
jest.mock('axios', () => {
  const axiosMockModule = {
    get: jest.fn() // <-- reemplazamos el get original por una función de jest
  }
  return axiosMockModule
})

// console.log(get)

const countriesResponse = [
  { id: 1, name: 'Chile', region: 'America', subregion: 'South America'},
  { id: 2, name: 'Germany', region: 'Europe', subregion: 'Western Europe'},
  { id: 3, name: 'Argentina', region: 'America', subregion: 'South America'},
  { id: 4, name: 'Belgium', region: 'Europe', subregion: 'Western Europe'},
  { id: 5, name: 'Bolivia', region: 'America', subregion: 'South America'},
]

describe('Tests for Countries Service', () => {

  it('should returns only the south americans names', async () => {
    countriesService.getCountries = () => Promise.resolve(countriesResponse)
    //get.mockReturnValue({ data: countriesResponse })
    //  El método que utilicemos dependerá de como esté implementada la lógica a reemplazar
    //get.mockResolvedValue({ data: countriesResponse })
    const expectedResult = ['Chile', 'Argentina', 'Bolivia']

    const testValue = await countriesService.getSouthAmericanCountries()

    // "Espero que valor de prueba sea igual al resultado esperado"
    expect(testValue).toEqual(expectedResult)
    // Cuando utilizamos mocks podemos corroborar que este se haya llamado con los argumentos correctos y de esta manera "forzar" a que se utilice la api de cierta forma.
    // expect(get).toHaveBeenCalledWith('https://restcountries.eu/rest/v2/all')
  })

  it.only('should return an empty array when error is throw', async () => {
    // Si no queremos configurar un valor de retorno sino el código de la función a reemplazar lo podemos hacer como .mockImplementation()
    // get.mockImplementation((url) => {
    //   // podemos revisar que get fue llamado desde el código
    //   console.log('URL in axios.get method -->', url)

    //   // acá reemplazamos el comportamiento, en este caso lanzar un error para forzar al código a caer en el bloque catch() {}
    //   throw new Error('Server fatal error')
    // })
    //¿podremos hacerlo más fácil? https://jestjs.io/docs/mock-function-api#mockfnmockrejectedvaluevalue
    get.mockRejectedValue(new Error('Server fatal error'))

    const testValue = await countriesService.getSouthAmericanCountries()

    expect(testValue).toEqual([])
  })

})

