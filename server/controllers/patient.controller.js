import * as patientService from "./../services/patient.service.js"

export const createPatient = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            phone,
            email,
            address
        } = req.body

        const patient = await patientService.createPatient({
            first_name: firstName, last_name: lastName,
            date_of_birth: dateOfBirth,
            phone, email, address
        })
        return res.json(patient)
    } catch (error) {
        res.json(error)
    }
}

export const deletePatient = async (req, res) => {
    try {
        const id = req.params.id
        await patientService.deletePatient(id)
        return res.json({ message: "Patient Deleted Successfully" })
    } catch (error) {
        res.json(error)
    }
}

export const updatePatient = async (req, res) => {
try {
    const {
        first_name,
        last_name,
        phone,
        email,
        address
    } = req.body

    const patient = await patientService.updatePatient({
        first_name, last_name,
        phone, email, address
    })
    return res.json(patient)
    } catch (error) {
        res.json(error)
    }
}

export const getPatient = async (req, res) => {
    try {
        const id = req.params.id
        const patient = await patientService.getPatient(id)
        return res.json(patient)
    } catch (error) {
        res.json(error)
    }
}

export const getPatients = async (req, res) => {
    try {
        const patients = await patientService.getPatients()
        return res.json(patients)
    } catch (error) {
        res.json(error)
    }
}