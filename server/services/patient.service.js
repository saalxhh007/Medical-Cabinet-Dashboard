import Patient from "../models/patient.model.js"

export const createPatient = async ({ first_name, last_name, date_of_birth, phone, email, address }) => {
    try {
        const patient = await Patient.create({ first_name, last_name, date_of_birth, phone, email, address })
        return patient
    } catch (error) {
        throw error
    }
}

export const deletePatient = async (id) => {
    try {
        const deleted = await Patient.destroy({ where: { id } })
        return deleted
    } catch (error) {
        throw error
    }
}

export const updatePatient = async ({ first_name, last_name, phone, email, address }) => {
    try {
        const [updated] = await Patient.update(
            { first_name, last_name, phone, email, address },
            { where: { id } }
        )
        return updated
    } catch (error) {
        throw error
    }
}

export const getPatient = async (id) => {
    try {
        const patient = await Patient.findByPk(id)
        return patient
    } catch (error) {
        throw error
    }
}

export const getPatients = async () => {
    try {
        const patients = await Patient.findAll()
        
        const formattedPatients = patients.map(patient => {
            return {
                ...patient.dataValues,
                dateOfBirth: patient.date_of_birth,
                firstName: patient.first_name,
                lastName: patient.last_name
            }
        })

        return formattedPatients
    } catch (error) {
        throw error
    }
}