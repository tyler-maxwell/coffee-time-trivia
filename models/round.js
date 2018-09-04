module.exports = function(sequelize, DataTypes) {
  var Round = sequelize.define("Round", {});

  Round.associate = function(models) {
    Round.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Round.belongsTo(models.Question, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Round;
};
