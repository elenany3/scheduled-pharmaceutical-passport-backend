module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define(
    "Prescription",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passport_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countries: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,
      tableName: 'prescription'
    }
  );
  Prescription.associate = (models) => {
    Prescription.belongsTo(models.User, { as: "user", foreignKey: 'user_id' });
    Prescription.hasMany(models.PrescriptionDrug, { as: "drugs", foreignKey: 'prescription_id' });
  };
  return Prescription;
};
