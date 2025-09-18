import { col, fn, Op } from "sequelize"
import Patient from "../models/patient.model.js"
import Appointment from "../models/appointment.model.js"
import Transaction from "../models/transaction.model.js"

export const generatePatientSummaryReportMonth = async (month, year) => {
    try {
        const newPatients = await Patient.count({
            where: {
                created_At: {
                    [Op.between]: [
                        new Date(year, month - 1, 1),
                        new Date(year, month, 0)
                    ]
                }
            }
        })
        return newPatients
    } catch (error) {
        throw error
    }
}

export const generateAppointmentAnalysisReportMonth = async (month, year) => {
    try {
        const appointments = await Appointment.findAll({
            attributes: [
                "status",
                [fn("COUNT", col("id")), "count"]],
            where: {
                date: {
                    [Op.between]: [
                        new Date(year, month - 1, 1),
                        new Date(year, month, 0)
                    ]
                }
            },
            group: ["status"]
        })
        return appointments
    } catch (error) {
        throw error
    }
}

export const generateVisitRecordsReportMonth = async (month, year) => {
    try {
        const visits = await Appointment.findAll({
            where: {
                date: {
                    [Op.between]: [
                        new Date(year, month - 1, 1),
                        new Date(year, month, 0)
                    ]
                }
            },
            include: ["Patient", "Doctor"]
        })
        return visits
    } catch (error) {
        throw error
    }
}

export const generateFinancialSummaryReportMonth = async (month, year) => {
    try {
        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 0, 23, 59, 59)
    
        const transactions = await Transaction.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
                status: "Completed",
            },
            raw: true,
        })
        const totalGain = transactions
            .filter((t) => t.financial_impact === "gain")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0)

        const totalLoss = transactions
            .filter((t) => t.financial_impact === "loss")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    
        const net = totalGain - totalLoss
        const breakdown = {}
        transactions.forEach((t) => {
            if (!breakdown[t.type]) {
                breakdown[t.type] = { gain: 0, loss: 0 }
            }
            if (t.financial_impact === "gain") {
                breakdown[t.type].gain += parseFloat(t.amount)
            } else {
                breakdown[t.type].loss += parseFloat(t.amount)
            }
        })
        return {
            totalGain,
            totalLoss,
            net,
            breakdown,
        }
    } catch (error) {
        throw error
    }
}