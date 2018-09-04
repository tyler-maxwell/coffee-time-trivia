module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    question: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    answer1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    answer2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    answer3: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    answer4: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correctAnswer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approved: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    disapproved: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    correctGuesses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    incorrectGuesses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Question;
};
