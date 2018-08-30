var db = require("../models");

module.exports = function(app) {
  //Load sign in page
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
    console.log(req.user);
    db.User.findOne({ where: { id: req.user.id } }).then(function(user) {
      res.render("game", {
        isUser: true,
        user: user
      });
    });
  });

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

  //Helper function for passport functionality
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  }
};
