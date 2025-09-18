import express from "express"
import * as reportController from "./../controllers/report.controller.js"

const reportRouter = express.Router()

reportRouter.post("/patient-summary", reportController.getPatientSummaryReportMonth)
reportRouter.post("/appointment-analysis", reportController.getAppointmentAnalysisReportMonth)
reportRouter.post("/appointment-records", reportController.getVisitRecordsReportMonth)
reportRouter.post("/financial-summary", reportController.getFinancialSummaryReportMonth)

export default reportRouter