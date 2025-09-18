import documentService from "../services/document.service.js";

class DocumentController {
  async createDocument(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const document = documentService.createDocument(req.file, req.body);
      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocuments(req, res) {
    try {
      const docs = await documentService.getDocuments()
      res.json(docs)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDocument(req, res) {
    try {
      const doc = documentService.getDocument(req.params.id);
      if (!doc) return res.status(404).json({ message: "Document not found" });
      res.json(doc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDocument(req, res) {
    try {
      const doc = documentService.updateDocument(req.params.id, req.body);
      if (!doc) return res.status(404).json({ message: "Document not found" });
      res.json(doc);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDocument(req, res) {
    try {
      const doc = documentService.deleteDocument(req.params.id);
      if (!doc) return res.status(404).json({ message: "Document not found" });
      res.json({ message: "Document deleted", doc });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DocumentController();