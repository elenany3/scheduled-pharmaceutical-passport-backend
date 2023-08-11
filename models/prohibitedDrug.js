module.exports = (sequelize, DataTypes) => {
  const ProhibitedDrug = sequelize.define(
    "ProhibitedDrug",
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
    },
    {
      timestamps: true,
      tableName: 'prohibited_drug'
    }
  );
  ProhibitedDrug.associate = (models) => {
    ProhibitedDrug.belongsTo(models.User, { as: "user", foreignKey: 'user_id' });
  };
  return ProhibitedDrug;
};
