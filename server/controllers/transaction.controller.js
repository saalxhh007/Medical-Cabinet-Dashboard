import transactionService from "../services/transaction.service.js"

class TransactionController {
  async getAll(req, res) {
    try {
      const { status, type } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (type) filters.type = type;

      const transactions = await transactionService.getAll(filters);
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const newTransaction = await transactionService.create(req.body);
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await transactionService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Transaction not found" });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await transactionService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Transaction not found" });
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new TransactionController()