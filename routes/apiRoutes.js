var db = require("../models");

module.exports = function(app) {
  app.get("/api/users/:username/:password", function(req, req) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(user) {
      if (user.password === req.params.password) {
        var data = {
          username: user.username,
          wins: user.wins,
          losses: user.losses
        };
        res.json(data);
      } else {
        res.json(null);
      }
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(result) {
      if (result) {
        res.json(null);
      } else {
        db.User.create({
          username: req.body.username,
          password: req.body.password
        }).then(function(newUser) {
          var data = {
            username: newUser.username,
            wins: newUser.wins,
            losses: newUser.losses
          };
          res.json(data);
        });
      }
    });
  });

  app.get("api/game/:user/:id", function(req, res) {
    var approved = [];
    var disapproved = [];
    var question = [];
    var answer1 = [];
    var answer2 = [];
    var answer3 = [];
    var answer4 = [];
    var correctAnswer = [];
    var QuestionId;
    //need to query for user and determine which question they're on
    db.Answered.findOne({
      attributes: ["QuestionId"],
      where: {
        username: req.params.user
      }
    }).then(function(data) {
      QuestionId = data.QuestionId;
    });
    db.Questions.findAll({
      where: {
        id: {
          $gt: QuestionId
        }
      }
    }).then(function(data) {
      approved = data.approved;
      disapproved = data.disapproved;
      question = data.question;
      answer1 = data.answer1;
      answer2 = data.answer2;
      answer3 = data.answer3;
      answer4 = data.answer4;
      correctAnswer = data.correctAnswer;
    });
    for (i = 0; i < approved.length; i++) {
      var rating = approved[i] / (approved[i] + disapproved[i]);
      if (rating >= 0.5) {
        res.render("Game", {
          question: question[i],
          answer1: answer1[i],
          answer2: answer2[i],
          answer3: answer3[i],
          answer4: answer4[i],
          correctAnswer: correctAnswer[i]
        });
      }
    }
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
