var db = require("../models");

module.exports = function(app) {
  // Load user page
  app.get("/user", function(req, res) {
    res.render("index");
  });
};
