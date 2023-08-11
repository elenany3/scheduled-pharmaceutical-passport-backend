const { roles } = require("../../config");
const db = require("../../models");
const { save_drugs, delete_by_prescription } = require("./PrescriptionDrug");
const { is_drugs_available } = require("./prohibitedDrug");
exports.create = async ({ body, user }) => {
    const { patient_name, passport_number, countries, instructions, drugs } = body;
    if (user.role != roles.doctor) return { err: "Only doctor can add prescription.", status: 401 };
    let availableDrugs = drugs.map(object => object.name);
    let countriesArr = countries.split(',');
    let updatedCountries = countriesArr.map(element => element.trim());
    let prohibitedDrugs = await is_drugs_available(availableDrugs, updatedCountries);
    if (prohibitedDrugs.length > 0) {
        return { err: `Prohibited Drugs ${prohibitedDrugs[0]['drug']} in ${prohibitedDrugs[0]['country']}`, status: 406 };
    } else {
        const prescription = await db.Prescription.create({
            patient_name, passport_number, countries, instructions, user_id: user.id
        });
        drugs.forEach(object => { object.prescription_id = prescription.id });
        const prescriptionDrugs = await save_drugs(drugs);
        const prescriptionData = prescription.dataValues ? prescription.dataValues : prescription;
        return {
            message: "Prescription created successfully.",
            data: { ...prescriptionData, drugs: prescriptionDrugs },
        };
    }
};

exports.delete = async ({ params, user }) => {
    const { id } = params;
    if (user.role != roles.doctor) return { err: "Only doctor can delete drug.", status: 401 };
    let foundPrescription = await db.Prescription.findOne({ where: { id: id, user_id: user.id } });
    if (!foundPrescription) return { err: "no such prescription or you are not allowed to delete it.", status: 404 };
    else {
        await delete_by_prescription(id);
        await db.Prescription.destroy({ where: { id } });
        return {
            message: "Prescription deleted successfully."
        };
    }
};

exports.get = async ({ user }) => {
    let prescriptions = await db.Prescription.findAll({
        include: [
            {
                model: db.User,
                as: "user",
                include: [{
                    model: db.Doctor,
                    as: "doctor"
                }],
            },
            {
                model: db.PrescriptionDrug,
                as: "drugs"
            },
        ],
        where: { user_id: user.id }
    });
    return {
        message: "Prescription retrieved successfully.",
        data: prescriptions
    };
};

exports.getbyPatient = async ({params}) => {
    const { patientPassport } = params;
    let prescriptions = await db.Prescription.findAll({
        include: [
            {
                model: db.User,
                as: "user",
                include: [{
                    model: db.Doctor,
                    as: "doctor"
                }],
            },
            {
                model: db.PrescriptionDrug,
                as: "drugs"
            },
        ],
        where: {passport_number: patientPassport}
    });
    return {
        message: "Prescription retrieved successfully.",
        data: prescriptions
    };
};
