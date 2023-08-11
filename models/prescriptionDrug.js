module.exports = (sequelize, DataTypes) => {
  const PrescriptionDrug = sequelize.define(
    "PrescriptionDrug",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true,
      tableName: 'prescription_drug'
    }
  );
  PrescriptionDrug.associate = (models) => {
    PrescriptionDrug.belongsTo(models.Prescription, { as: "prescription", foreignKey: 'prescription_id' });
  };
  return PrescriptionDrug;
};
