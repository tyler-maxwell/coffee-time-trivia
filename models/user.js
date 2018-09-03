module.exports = function(sequelize, DataTypes) {
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

  User.associate = function(models) {
    User.hasMany(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
