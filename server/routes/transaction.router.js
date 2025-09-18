import { Router } from "express";
import transactionController from "../controllers/transaction.controller.js"

const transactionRouter = Router()

transactionRouter.get("/", transactionController.getAll);
transactionRouter.post("/", transactionController.create);
transactionRouter.put("/:id", transactionController.update);
transactionRouter.delete("/:id", transactionController.delete);

export default transactionRouter