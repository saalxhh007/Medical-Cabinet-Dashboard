import express from "express"
import * as transactionController from "./../controllers/transaction.controller.js"

const chatRouter = express.Router()

// chatRouter.post("/", transactionController.createTransaction)
// chatRouter.delete("/:id", transactionController.deleteTransaction)
// chatRouter.get("/", transactionController.getStats)

export default chatRouter