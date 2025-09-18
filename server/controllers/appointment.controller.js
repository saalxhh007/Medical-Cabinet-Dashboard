import appointmentService from "../services/appointment.service.js";

class AppointmentController {
  async createAppointment(req, res) {
    try {
      const appointment = await appointmentService.createAppointment(req.body)
      res.status(201).json(appointment)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async deleteAppointment(req, res) {
    try {
      const appointment = await appointmentService.deleteAppointment(req.params.id)
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" })
      }
      res.json({ message: "Appointment deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async updateAppointment(req, res) {
    try {
      const appointment = await appointmentService.updateAppointment(req.params.id, req.body)
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" })
      }
      res.json(appointment)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAppointment(req, res) {
    try {
      const appointment = await appointmentService.getAppointment(req.params.id)
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" })
      }
      res.json(appointment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async getAppointments(req, res) {
    try {
      const appointments = await appointmentService.getAppointments()
      res.json(appointments)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async updateStatus(req, res) {
    try {
      const { id, status } = req.body
      const appointment = await appointmentService.updateStatus(id, status)
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" })
      }
      res.json(appointment)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async events(req, res) {
    try {
      const { day } = req.body
      const appointment = await appointmentService.events(day)
      if (!appointment) {
        return res.status(404).json({ message: `No Events For ${day}`  })
      }
      res.json(appointment)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default new AppointmentController()