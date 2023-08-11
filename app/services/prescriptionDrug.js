const { roles } = require("../../config");
const db = require("../../models");

exports.save_drugs = async (arrayOfDrugs) => {
  return await _save_drugs(arrayOfDrugs);
};

_save_drugs = async (arrayOfDrugs) => {
  try {
    return new Promise(async (resolve, reject) => {
      const prescriptionDrug = await db.PrescriptionDrug.bulkCreate(arrayOfDrugs);
      resolve(prescriptionDrug);
    });
  } catch (err) {
    return{ error: true, message: err.message };
  }
};

exports.delete_by_prescription = async (prescription_id) => {
  await _delete_by_prescription(prescription_id);
};

_delete_by_prescription = async (prescription_id) => {
  try {
    return new Promise(async (resolve, reject) => {
      await db.PrescriptionDrug.destroy({ where: { prescription_id } });
      resolve({
        message: "Drugs deleted successfully."
      });
    });
  } catch (err) {
    return{ error: true, message: err.message };
  }
};
