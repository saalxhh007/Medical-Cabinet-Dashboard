import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt"

export const createDoctor = async ({ first_name, last_name, phone,
    email, address, speciality, bio, password }) => {
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null
        const doctor = await Doctor.create({
        first_name,
        last_name,
        phone,
        email,
        address,
        speciality,
        bio,
        password: hashedPassword
        })
        return doctor
    } catch (error) {
        throw error
    }
}

export const deleteDoctor = async (id) => {
    try {
        const deleted = await Doctor.destroy({ where: { id } })
        return deleted
    } catch (error) {
        throw error
    }
}

export const updateDoctor = async ({ first_name, last_name, phone,
    email, address, speciality, bio, password }) => {
    try {
        const updateData = { first_name, last_name, phone, email, address, speciality, bio };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const [updated] = await Doctor.update(updateData, { where: { id } });
        return updated
    } catch (error) {
        throw error
    }
}