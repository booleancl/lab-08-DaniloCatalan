const events = [
  { id: 1, title: 'Lanzamiento Programa Javascript Fullstack' },
  { id: 2, title: 'Lanzamiento Programa QA Automatizado' },
  { id: 3, title: 'Lanzamiento Programa Fundamentos de la programación' }
]
// const res = {
//   json(data){
//     return this
//   },
//   status(code){
//     return this
//   }
// }
// res.status = function(){
//   return this
// }

// const res = {
//   json: jest.fn(),
//   status: jest.fn().mockImplementation(function(){
//     return this
//   })
// }

// res.status()

const eventsController = {
  getEvents: (req, res) => {
    if (req.headers['Authorization']) {
      res.status(200).json(events)
    } else {
      req.logger
        .Info()
        .log('Acceso denegado', { sessionId: req.sessionId, username: req.username })
      res.status(401)
    }
  }
}

module.exports = {
  eventsController,
  events
}