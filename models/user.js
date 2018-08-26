module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    UserName: DataTypes.STRING(250),
    password: DataTypes.STRING(50),
    correct: DataTypes.TINYINT,
    wrong: DataTypes.TINYINT
  });

  User.associate = function(models) {
    User.hasMany(models.Questions, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  User.associate = function(models) {
    Question.belongsToMany(User, { through: "Answered" });
    User.belongsToMany(models.Question, { through: "Answered" });
    return User;
  };
};
