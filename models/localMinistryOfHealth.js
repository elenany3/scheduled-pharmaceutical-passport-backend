module.exports = (sequelize, DataTypes) => {
  const LocalMinistryOfHealth = sequelize.define(
    "LocalMinistryOfHealth",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,
      tableName: 'local_ministry_of_health',
    }
  );
  LocalMinistryOfHealth.associate = (models) => {
    LocalMinistryOfHealth.belongsTo(models.User, { as: "user", foreignKey: 'user_id' });
  };
  return LocalMinistryOfHealth;
};
