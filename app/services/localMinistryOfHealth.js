const { roles } = require("../../config");
const db = require("../../models");
const { save_user, get_user, delete_user } = require("./auth");
exports.create = async ({ body, user }) => {
    const { email, password, address, country_name, country_code } = body;
    if (user.role != roles.admin) return { err: "Only admins can add LMH.", status: 401 };
    const newUser = await save_user({ email, password, address, role: roles.lmh });
    if (newUser.error) {
        return newUser;
    } else {
        const lmh = await db.LocalMinistryOfHealth.create({ country_name, country_code, user_id: newUser.id });
        let userData = newUser.dataValues ? newUser.dataValues : newUser;
        return {
            message: "Local Ministry Of Health created successfully",
            data: { ...userData, lmh },
        };
    }
};

exports.delete = async ({ params, user }) => {
    const { address } = params;
    if (user.role != roles.admin) return { err: "Only admins can delete LMH.", status: 401 };
    const lmhUser = await get_user({ address });
    if (lmhUser) {
        await db.LocalMinistryOfHealth.destroy({ where: { user_id: lmhUser.id } });
        await delete_user({ id: lmhUser.id });
    }
    return {
        message: "Local Ministry Of Health deleted successfully."
    };
};

exports.getAll = async () => {
    let users = await db.LocalMinistryOfHealth.findAll({
        include: {
            model: db.User,
            as: "user"
        },
    });
    return {
        message: "Local Ministry Of Health retrieved successfully.",
        data: users
    };
};
