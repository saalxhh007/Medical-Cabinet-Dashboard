import express from "express"
import * as doctorController from "./../controllers/doctor.controller.js"

const doctorRouter = express.Router()

doctorRouter.post("/", doctorController.createDoctor)
doctorRouter.delete("/:id", doctorController.deleteDoctor)
doctorRouter.patch("/:id", doctorController.updateDoctor)

export default doctorRouter