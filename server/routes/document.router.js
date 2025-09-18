import { Router } from "express";
import multer from "multer";
import path from "path";
import documentController from "../controllers/document.controller.js";
import fs from "fs";

const documentRouter = Router();

const upload = multer({ storage: multer.memoryStorage() })

documentRouter.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const ext = path.extname(req.file.originalname);

    const patientName =
      req.body.patientFirstName && req.body.patientLastName
        ? `${req.body.patientFirstName} ${req.body.patientLastName}`
        : "Unknown";

    const category = req.body.category ? req.body.category.trim() : "Document";

    const safeName = `${category} - ${patientName}${ext}`.replace(/\s+/g, " ");

    const uploadPath = path.join("uploads/documents", safeName);

    fs.writeFileSync(uploadPath, req.file.buffer);

    req.file.path = uploadPath;
    req.file.filename = safeName;

    return documentController.createDocument(req, res)
  } catch (err) {
    next(err)
  }
})

documentRouter.delete("/:id", (req, res) =>
  documentController.deleteDocument(req, res)
)

documentRouter.patch("/:id", (req, res) =>
  documentController.updateDocument(req, res)
);

documentRouter.get("/:id", (req, res) =>
  documentController.getDocument(req, res)
);

documentRouter.get("/", (req, res) =>
  documentController.getDocuments(req, res)
);

export default documentRouter