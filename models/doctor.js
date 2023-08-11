module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "Doctor",
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      national_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clinic_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'doctor',
    }
  );
  Doctor.associate = (models) => {
    Doctor.belongsTo(models.User, { as: "doctor", foreignKey: 'doctor_id' });
    Doctor.belongsTo(models.User, { as: "user", foreignKey: 'user_id' });
  };
  return Doctor;
};
