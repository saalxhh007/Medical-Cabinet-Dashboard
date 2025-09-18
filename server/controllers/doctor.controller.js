import * as doctorService from "./../services/doctor.service.js"

export const createDoctor = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            email,
            speciality,
            bio,
            address,
            password
        } = req.body

        const doctor = await doctorService.createDoctor({
            first_name, last_name,
            phone, email, address,
            speciality, bio, password
        })
        return res.json(doctor)
    } catch (error) {
        res.json(error)
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id
        await doctorService.deleteDoctor(id)
        return res.json({ message: "Doctor Deleted Successfully" })
    } catch (error) {
        res.json(error)
    }
}

export const updateDoctor = async (req, res) => {
try {
    const {
        first_name,
        last_name,
        phone,
        email,
        speciality,
        bio,
        password,
        address
    } = req.body

    const doctor = await doctorService.updateDoctor({
        first_name, last_name,
        phone, email, address,
        speciality, bio, password
    })
    return res.json(doctor)
    } catch (error) {
        res.json(error)
    }
}