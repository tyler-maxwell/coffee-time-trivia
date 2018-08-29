var db = require("../models");

module.exports = function(app, passport) {
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
};
