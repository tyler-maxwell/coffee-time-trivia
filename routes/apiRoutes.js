var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var db = require("../models");

module.exports = function(app, passport) {
  //====================
  //Authentication Routes
  //====================

  //Sign up new user
  app.post(
    "/api/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/404"
    })
  );

  //Sign in as existing user
  app.post(
    "/api/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/404"
    })
  );

  //====================
  //User Routes
  //====================

  //Update user
  app.put("/api/users", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //====================
  //Game Routes
  //====================

  //Get question by id
  app.get("/api/questions/:id", function(req, res) {
    db.Question.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbQuestion) {
      db.User.findOne({
        where: {
          id: dbQuestion.dataValues.UserId
        }
      }).then(function(dbUser) {
        dbQuestion.dataValues.username = dbUser.dataValues.username;
        res.json(dbQuestion.dataValues);
      });
    });
  });

  //Post round result
  app.post("/api/rounds", function(req, res) {
    db.Round.create({
      UserId: req.body.UserId,
      QuestionId: req.body.QuestionId
    }).then(function(dbRound) {
      res.json(dbRound);
    });
  });

  //Update question
  app.put("/api/questions", function(req, res) {
    db.Question.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbQuestion) {
      res.json(dbQuestion);
    });
  });

  //====================
  //Extra Routes
  //====================

  //Get a single question that user has not created or answered
  app.get("/api/next_question/:userId", function(req, res) {
    db.Round.findAll({
      attributes: ["QuestionId"],
      where: {
        UserId: req.params.userId
      }
    }).then(function(dbRounds) {
      var answered = [];
      dbRounds.forEach(element => {
        answered.push(element.dataValues.QuestionId);
      });
      db.Question.findOne({
        where: {
          UserId: {
            [Op.ne]: req.params.userId
          },
          id: {
            [Op.notIn]: answered
          }
        }
      }).then(function(dbQuestion) {
        res.json(dbQuestion);
      });
    });
  });

  //Get all questions that user has not created or answered
  app.get("/api/unanswered/:userId", function(req, res) {
    db.Round.findAll({
      attributes: ["QuestionId"],
      where: {
        UserId: req.params.userId
      }
    }).then(function(dbRounds) {
      var answered = [];
      dbRounds.forEach(element => {
        answered.push(element.dataValues.QuestionId);
      });
      db.Question.findAll({
        where: {
          UserId: {
            [Op.ne]: req.params.userId
          },
          id: {
            [Op.notIn]: answered
          }
        }
      }).then(function(dbQuestions) {
        res.json(dbQuestions);
      });
    });
  });
};
