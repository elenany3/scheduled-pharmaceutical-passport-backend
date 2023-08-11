const { roles } = require("../config");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
          unique:true,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(roles)),
          allowNull: false,
        },
      },
      {
        timestamps: true,
        tableName: 'user',
        indexes: [
          {
            unique: true,
            fields: ["email"],
          },
        ],
      }
    );
    User.associate = (models) => {
      User.hasOne(models.LocalMinistryOfHealth, { as: "localMinistryOfHealth", foreignKey: 'user_id' });
      User.hasOne(models.Doctor, { as: "doctor", foreignKey: 'doctor_id' });
      User.hasMany(models.Doctor, { as: "user", foreignKey: 'user_id' });
      User.hasMany(models.ProhibitedDrug, { as: "drug", foreignKey: 'user_id' });
      User.hasMany(models.Prescription, { as: "prescription", foreignKey: 'user_id' });
    };
    return User;
  };
  