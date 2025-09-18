import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";
import { col } from "sequelize";

class AppointmentService {
  async createAppointment(data) {
    return await Appointment.create(data)
  }

  async deleteAppointment(id) {
    const appointment = await Appointment.findByPk(id)
    if (!appointment) return null
    await appointment.destroy()
    return appointment
  }

  async updateAppointment(id, updates) {
    const appointment = await Appointment.findByPk(id)
    if (!appointment) return null
    await appointment.update(updates)
    return appointment
  }

  async getAppointment(id) {
    return await Appointment.findByPk(id, {
      include: [
        { model: Patient, attributes: ["id", "name", "email"] },
        { model: Doctor, attributes: ["id", "name", "specialty"] },
      ],
    })
    }

    async getAppointments() {
        return await Appointment.findAll({
            include: [
                {
                    model: Patient,
                    attributes: [
                        "id",
                        [col("first_name"), "firstName"],
                        [col("last_name"), "lastName"],
                        "email",
                        "phone",
                    ],
                },
                {
                    model: Doctor,
                    attributes: [
                    "id",
                    [col("first_name"), "firstName"],
                    [col("last_name"), "lastName"],
                    [col("speciality"), "speciality"],
                    ],
                },
            ],
        })
    }

  async updateStatus(id, status) {
    const appointment = await Appointment.findByPk(id)
    if (!appointment) return null
    appointment.status = status
    await appointment.save()
    return appointment
  }

  async events(day) {
    const appointments = await Appointment.findAll({
      where: { date: day },
      include: [
        {
          model: Patient,
          attributes: [
            "id",
            [col("first_name"), "firstName"],
            [col("last_name"), "lastName"],
            "email",
            "phone",
          ],
        },
        {
          model: Doctor,
          attributes: [
            "id",
            [col("first_name"), "firstName"],
            [col("last_name"), "lastName"],
          ]
        }
      ],
      order: [["time", "ASC"]]
    })
    return appointments.map((appt) => {
      let title;

      if (appt.patient) {
        title = `${appt.patient.first_name} ${appt.patient.last_name} - Consultation`
      } else if (appt.doctor) {
        title = `${appt.doctor.first_name} ${appt.doctor.last_name} - Surgery Prep`
      } else {
        title = "General Appointment"
      }
      return {
        time: appt.time.slice(0, 5),
        title,
        type: "appointment"
      }
    })
  }
}

export default new AppointmentService()