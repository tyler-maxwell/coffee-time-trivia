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
