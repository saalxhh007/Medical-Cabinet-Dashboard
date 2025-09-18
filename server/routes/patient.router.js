import express from "express"
import * as patientController from "./../controllers/patient.controller.js"

const patientRouter = express.Router()

patientRouter.post("/", patientController.createPatient)
patientRouter.delete("/:id", patientController.deletePatient)
patientRouter.patch("/:id", patientController.updatePatient)
patientRouter.get("/:id", patientController.getPatient)
patientRouter.get("/", patientController.getPatients)

export default patientRouter