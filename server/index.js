import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db.js";

import patientRouter from "./routes/patient.router.js"
import appointmentRouter from "./routes/appointment.router.js"
import doctorRouter from "./routes/doctor.router.js"
import reportRouter from "./routes/report.router.js"
import transactionRouter from "./routes/transaction.router.js"
import chatRouter from "./routes/chat.router.js"
import documentRouter from "./routes/document.router.js"


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

const syncDatabase = async () => {
  try {
    await sequelize.sync()
    console.log('Database synced successfully.')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

syncDatabase()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

app.use("/api/v1/patient", patientRouter)
app.use("/api/v1/doctor", doctorRouter)
app.use("/api/v1/appointment", appointmentRouter)
app.use("/api/v1/report", reportRouter)
app.use("/api/v1/document", documentRouter)
app.use("/api/v1/transaction", transactionRouter)
app.use("/api/v1/chat", chatRouter)
