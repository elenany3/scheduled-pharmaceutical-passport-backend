const { roles } = require("../../config");
const db = require("../../models");
const { save_user, get_user, delete_user } = require("./auth");
exports.create = async ({ body, user }) => {
    const { email, password, address, name, phone, registration_number, national_number, clinic_address} = body;
    if (user.role != roles.lmh) return { err: "Only local ministry of health can add doctor.", status: 401 };
    const newUser = await save_user({ email, password, address, role: roles.doctor });
    if (newUser.error) {
        return newUser;
    } else {
        const doctor = await db.Doctor.create({ name, phone, registration_number, national_number, clinic_address, doctor_id: newUser.id, user_id: user.id });
        let userData = newUser.dataValues ? newUser.dataValues : newUser;
        return {
            message: "Doctor created successfully.",
            data: { ...userData, doctor },
        };
    }
};

exports.delete = async ({ params, user }) => {
    const { address } = params;
    if (user.role != roles.lmh) return { err: "Only local ministry of health can delete doctor.", status: 401 };
    const doctorUser = await get_user({ address });
    if (doctorUser) {
        await db.Doctor.destroy({ where: { doctor_id: doctorUser.id } });
        await delete_user({ id: doctorUser.id });
    }
    return {
        message: "Doctor deleted successfully."
    };
};

exports.getAll = async ({user}) => {
    let users = await db.Doctor.findAll({
        include: {
            model: db.User,
            as: "doctor"
        },
        where: {user_id: user.id}
    });
    return {
        message: "Doctor retrieved successfully.",
        data: users
    };
};
