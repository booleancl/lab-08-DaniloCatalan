const { Event, Attendance } = require('../models')

module.exports = {
  markAttendanceInEvent: async (req, res) => {
    try {
      const { params, body } = req

      const event = await Event.findOne({
        where: {
          id: params.event_id,
        },
      })

      if (event === null) {
        return res
          .status(404)
          .json({
            message: 'El evento no existe en la base de datos',
            data: []
          })
      }

      // Comprueba que el usuario pueda marcar asistencia (browser fingerprint)
      const eventAttendance = await Attendance.findAll({
        where: {
          event_id: params.event_id,
        }
      })

      if (eventAttendance) {
        return res
          .status(409)
          .json({
            message: 'Un usuario ya ha marcado asistencia en este dispositivo',
            data: []
          })
      }
  
      // Construye el objeto de asistencia
      const data = {
        user_id: body.user_id,
        user_name: body.user_name,
        user_lastname: body.user_lastname,
        institution_id: body.institution_id,
        attendance_date: new Date(),
        event_id: body.event_id,
      }

      req.logger
        .Info()
        .log('Asistencia marcada exitosamente')

      const newAttendance = await Attendance.create(data)

      return res
        .status(201)
        .json({
          message,
          data: newAttendance
        })
  
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        data: []
      })
    }
  }
}
