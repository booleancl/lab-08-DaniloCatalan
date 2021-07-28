const axios = require('axios')

class CountriesService{
  // async getCountries() {
  //   const url = 'https://restcountries.eu/rest/v2/all'
  //   const response = await axios.get(url)
  
  //   return response.data
  // }
  getCountries() {
    const url = 'https://restcountries.eu/rest/v2/all'
    return axios.get(url)
      .then(response => response.data)
  }

  async getSouthAmericanCountries() {
    try {
      const result = await this.getCountries()

      return result
        .filter(country => country.subregion === 'South America')
        .map(country => country.name)
    
    } catch(error) {
      console.log('Error', error.message)
      return []
    }
  }
}

module.exports = new CountriesService()
