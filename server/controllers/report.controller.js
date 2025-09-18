import { sendPdfResponse } from "../helpers/pdf.generator.helper.js"
import * as reportService from "./../services/report.service.js"

export const getPatientSummaryReportMonth = async (req, res) => {
    try {
        const { month, year } = req.body
        const data = await reportService.generatePatientSummaryReportMonth(month, year)
        sendPdfResponse(res, "patient-summary.pdf", (doc) => {
            doc.fontSize(18).text("Patient Summary Report", { align: "center" })
            doc.moveDown()
            doc.fontSize(12).text(JSON.stringify(data, null, 2))
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAppointmentAnalysisReportMonth = async (req, res) => {
    try {
        const { month, year } = req.body
        const data = await reportService.generateAppointmentAnalysisReportMonth(month, year)
        sendPdfResponse(res, "appointment-analysis.pdf", (doc) => {
            doc.fontSize(18).text("Appointment Analysis Report", { align: "center" })
            doc.moveDown()
            doc.fontSize(12).text(JSON.stringify(data, null, 2))
        })
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getVisitRecordsReportMonth = async (req, res) => {
    try {
        const { month, year } = req.body
        const data = await reportService.generateVisitRecordsReportMonth(month, year)
        sendPdfResponse(res, "visit-records.pdf", (doc) => {
            doc.fontSize(18).text("Visit Records Report", { align: "center" })
            doc.moveDown()
            doc.fontSize(12).text(JSON.stringify(data, null, 2))
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getFinancialSummaryReportMonth = async (req, res) => {
    try {
        const { month, year } = req.body
        const data = await reportService.generateFinancialSummaryReportMonth(month, year)

        sendPdfResponse(res, "financial-summary.pdf", (doc) => {
            doc.fontSize(18).text("Financial Summary Report", { align: "center" })
            doc.moveDown()
            doc.fontSize(12).text(`Month: ${month}, Year: ${year}`)
            doc.moveDown()

            doc.text(`Total Gain: ${data.totalGain}`)
            doc.text(`Total Loss: ${data.totalLoss}`)
            doc.text(`Net: ${data.net}`)
            doc.moveDown()
            doc.text("Breakdown:")
            Object.entries(data.breakdown).forEach(([type, vals]) => {
                doc.text(`${type}: Gain ${vals.gain}, Loss ${vals.loss}`)
            })
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}