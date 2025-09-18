import { Router } from "express";
import appointmentController from "../controllers/appointment.controller.js";

const appointmentRouter = Router()

appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.delete("/:id", appointmentController.deleteAppointment);
appointmentRouter.patch("/:id", appointmentController.updateAppointment);
appointmentRouter.get("/:id", appointmentController.getAppointment);
appointmentRouter.get("/", appointmentController.getAppointments);
appointmentRouter.patch("/switch/status", appointmentController.updateStatus);

appointmentRouter.post("/get/events", appointmentController.events);

export default appointmentRouter;
