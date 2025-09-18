import Patient from "../models/patient.model.js";
import Transaction from "../models/transaction.model.js"

class TransactionService {
    async getAll(filters = {}) {
        const transactions = await Transaction.findAll({
            where: filters,
            include: [
                {
                    model: Patient,
                    attributes: ["first_name", "last_name"]
                }
            ]
        })
  
        return transactions.map(t => ({
            ...t.toJSON(),
            patientFirstName: t.Patient?.first_name || null,
            patientLastName: t.Patient?.last_name || null,
        }))
    }


  async getById(id) {
    return Transaction.findByPk(id);
  }

  async create(data) {
    return Transaction.create(data);
  }

  async update(id, data) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) return null;
    return transaction.update(data);
  }

  async delete(id) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) return null;
    await transaction.destroy();
    return transaction;
  }
}

export default new TransactionService()