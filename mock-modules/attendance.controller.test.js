const attendanceController = require('../SUT/controllers/attendance.controller')
const { Event, Attendance } = require('../SUT/models')

jest.mock('../SUT/models', () => {
  const Event = {
    findOne: jest.fn()
  }
  const Attendance = {
    findAll: jest.fn(),
    create: jest.fn()
  }
  return { Event, Attendance }
})

describe('Attendance Controller Tests', () => {
  let req
  let res

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      logger: {
        Info: jest.fn().mockImplementation(function(){
          return this
        }),
        log: jest.fn()
      }
    }
    res = {
      // ¿ Por qué usamos función normal en vez de function flecha ?, Experimenta a ver que pasa ...
      status: jest.fn().mockImplementation(function() {
        return this
      }),
      json: jest.fn(),
    }
  })

  it('should return 404 with message when event is not find', async () => {
    Event.findOne.mockResolvedValue(null)

    await attendanceController.markAttendanceInEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: 'El evento no existe en la base de datos',
      data: []
    })

  })

  it('Test 409', async() => {
    Event.findOne.mockResolvedValue({})
    Attendance.findAll.mockResolvedValue({})
    
    await attendanceController.markAttendanceInEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Un usuario ya ha marcado asistencia en este dispositivo',
      data: []
    })
  })

  it('Test 201', async() => {
    Event.findOne.mockResolvedValue({})
    Attendance.findAll.mockResolvedValue(null)
    Attendance.create.mockResolvedValue({id:1})
    
    await attendanceController.markAttendanceInEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'asistencia marcada correctamente',
      data:{
        id:1
      }
    })
  })

})
