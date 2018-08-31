module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    correct: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    },
    wrong: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Question, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  User.associate = function (models) {
    models.Question.belongsToMany(User, { through: "Answered" });
    User.belongsToMany(models.Question, { through: "Answered" });
  };

  return User;
};
