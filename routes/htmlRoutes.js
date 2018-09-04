const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var db = require("../models");

module.exports = function(app) {
  //====================
  //Main Routes
  //====================

  //Load front page
  app.get("/", function(req, res) {
    console.log(req.user);
    //Check for user session
    if (req.user === undefined) {
      res.render("signin", {
        isUser: false,
        user: {}
      });
    } else {
      db.User.findOne({ where: { id: req.user.id } }).then(function(user) {
        res.render("signin", {
          isUser: true,
          user: user
        });
      });
    }
  });

  //Load dashboard
  app.get("/dashboard", isLoggedIn, function(req, res) {
    console.log(req.user);
    db.User.findOne({ where: { id: req.user.id } }).then(function(user) {
      res.render("dashboard", {
        isUser: true,
        user: user
      });
    });
  });

  //Load game
  app.get("/game", isLoggedIn, function(req, res) {
    db.User.findOne({ where: { id: req.user.id } }).then(function(user) {
      user.dataValues.totalAnswered =
        user.dataValues.correct + user.dataValues.wrong;
      db.Round.findAll({
        attributes: ["QuestionId"],
        where: {
          UserId: req.user.id
        }
      }).then(function(dbRounds) {
        var answered = [];
        dbRounds.forEach(element => {
          answered.push(element.dataValues.QuestionId);
        });
        db.Question.findOne({
          where: {
            UserId: {
              [Op.ne]: req.user.id
            },
            id: {
              [Op.notIn]: answered
            }
          }
        }).then(function(dbQuestion) {
          if (dbQuestion) {
            db.User.findOne({
              where: {
                id: dbQuestion.dataValues.UserId
              }
            }).then(function(dbUser) {
              dbQuestion.dataValues.username = dbUser.dataValues.username;
              res.render("game", {
                isUser: true,
                isQuestion: true,
                user: user.dataValues,
                question: dbQuestion.dataValues
              });
            });
          } else {
            res.render("game", {
              isUser: true,
              isQuestion: false,
              user: user.dataValues
            });
          }
        });
      });
    });
  });

  //====================
  //Other Routes
  //====================

  //Load sign in page on logout
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  //Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  //====================
  //Helper Functions
  //====================

  //Helper function for passport functionality
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  }
};
