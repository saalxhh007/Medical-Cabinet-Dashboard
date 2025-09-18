import Document from "../models/document.model.js";

class DocumentService {
  async createDocument(file, body) {
    return await Document.create({
      name: file.filename,
      type: body.type || "unknown",
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      uploadDate: new Date().toISOString().split("T")[0],
      patientFirstName: body.firstName || null,
      patientLastName: body.lastName || null,
      category: body.category || null,
      tags: body.tags ? JSON.parse(body.tags) : [],
      filePath: file.path,
    });
  }

  async getDocuments() {
    const docs = await Document.findAll()
    return docs.map(doc => doc.toJSON())
  }

  async getDocument(id) {
    return await Document.findByPk(id);
  }

  async updateDocument(id, updates) {
    const doc = await Document.findByPk(id);
    if (!doc) return null;
    await doc.update(updates);
    return doc;
  }

  async deleteDocument(id) {
    const doc = await Document.findByPk(id);
    if (!doc) return null;
    await doc.destroy();
    return doc;
  }
}

export default new DocumentService();
