const axios = require('axios')

class UserService {
  constructor() {
    this.user = null
    this.baseUrl = 'https://api.boolean.cl'
  }

  /*
    Retorna una lista con este "contrato"

    [
      { id: string; name: string; username: string }
    ]
  */
  getUsers() {
    const path = 'users/all'
    return axios.get(`${this.baseUrl}/${path}`)
  }
}