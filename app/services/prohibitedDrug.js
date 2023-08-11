const { roles } = require("../../config");
const db = require("../../models");
exports.create = async ({ body, user }) => {
    const { name } = body;
    if (user.role != roles.lmh) return { err: "Only local ministry of health can add Prohibited Drug.", status: 401 };
    const foundDrug = await db.ProhibitedDrug.findOne({ where: { name, user_id: user.id } });
    if (foundDrug)
        return { error: true, err: "This Drug is already exists", status: 409 };
    else {
        const drug = await db.ProhibitedDrug.create({ name, user_id: user.id });
        let drugData = drug.dataValues ? drug.dataValues : drug;
        return {
            message: "Prohibited Drug created successfully.",
            data: drugData,
        };
    }
};

exports.delete = async ({ params, user }) => {
    const { name } = params;
    if (user.role != roles.lmh) return { err: "Only local ministry of health can delete drug.", status: 401 };
    await db.ProhibitedDrug.destroy({ where: { name, user_id: user.id } });
    return {
        message: "Prohibited Drug deleted successfully."
    };
};

exports.getAll = async ({ user }) => {
    let drugs = await db.ProhibitedDrug.findAll({
        include: {
            model: db.User,
            as: "user"
        },
        where: { user_id: user.id }
    });
    return {
        message: "Prohibited Drug retrieved successfully.",
        data: drugs
    };
};

exports.is_drugs_available = async (drugs, countries) => {
    return await _is_drugs_available(drugs, countries);
};

_is_drugs_available = async (drugs, countries) => {
    try {
        return new Promise(async (resolve, reject) => {
            let result = [];
            let customCountries = [];
            countries.forEach(word => customCountries.push(word.toLowerCase()));
            const prohibitedDrug = await db.ProhibitedDrug.findAll({ 
                include: {
                    model: db.User,
                    as: "user",
                    include: {
                        model: db.LocalMinistryOfHealth,
                        as: "localMinistryOfHealth"
                    },
                },
                where: { name: drugs },
            });
            prohibitedDrug.forEach(async proDrug => {
                let country_name = proDrug.user.localMinistryOfHealth.country_name.toLowerCase();
                if(customCountries.includes(country_name)){
                    result.push({country: country_name, drug: proDrug.name});
                }
              });
            resolve(result);
        });
    } catch (err) {
        return { error: true, message: err.message };
    }
};