var db = require("../models");
module.exports = function (app) {
  //Load sign in page
  app.get("/", function (req, res) {
    console.log(req.user);
    //Check for user session
    if (req.user === undefined) {
      res.render("signin", {
        isUser: false,
        user: {}
      });
    } else {
      db.User.findOne({ where: { id: req.user.id } }).then(function (user) {
        res.render("signin", {
          isUser: true,
          user: user
        });
      });
    }
  });
    app.get("/dashboard", isLoggedIn, function (req, res) {
    console.log(req.user);
    db.User.findOne({ where: { id: req.user.id } }).then(function (user) {
      res.render("dashboard", {
        isUser: true,
        user: user
      });
    });
    });
    app.post("/submitquestion",isLoggedIn,function(req,res){
      // db.Todo.create({
      //   text: req.body.text,
      //   complete: req.body.complete
      // }).then(function(dbTodo) {
      //   // We have access to the new todo as an argument inside of the callback function
      //   res.json(dbTodo);
      // });
      db.Question.create({
        question:req.body.q1,
        answer1:req.body.a1,
        answer2:req.body.a2,
        answer3:req.body.a3,
        answer4:req.body.a4,
        correctAnswer:req.body.c1,
        UserId: req.user.id
      }).catch((err) =>{
        console.log(err);
      })
      });

  //Load dashboard
  // let final;
  // let incorrectanswer;
  // let question1;
  // let question2;
  // let question3;
  // let question4;
  // let question5;
  // let answer = {};

  // app.get("/dashboard", isLoggedIn, function (req, res) {
  //   console.log(req.user);
  //   request('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple', function (error, response, body) {
  //     console.log("---------------------------------------------")
  //     // obj=JSON.parse(body);
  //     // obj=JSON.stringify(obj);
  //     body = JSON.parse(body);
  //     console.log("---------------------------------------------joiey")
  //     console.log(body);
  //     final = {
  //       parth: body,

  //     }
  //     for (let i = 0; i <= 4; i++) {
  //       console.log("------->------->");
  //       // z= _under.extend(x, y);
  //       body.results[i].incorrect_answers.push(body.results[i].correct_answer);
  //     }
  //     function shuffle(a) {
  //       var j, x, i;
  //       for (i = a.length - 1; i > 0; i--) {
  //         j = Math.floor(Math.random() * (i + 1));
  //         x = a[i];
  //         a[i] = a[j];
  //         a[j] = x;
  //       }
  //       return a;
  //     }
  //     for (let i = 0; i <= 4; i++) {
  //       body.results[i].incorrect_answers = shuffle(body.results[i].incorrect_answers);
  //     }
  //     question1 = {
  //       q1: body.results[0],


  //     }
  //     question2 = {
  //       q2: body.results[1],


  //     }
  //     question3 = {
  //       q3: body.results[2],


  //     }
  //     question4 = {
  //       q4: body.results[3],


  //     }
  //     question5 = {
  //       q5: body.results[4],


  //     }

  //     console.log("--------------------------answer");
  //     console.log(body.results[0].incorrect_answers);

  //     // incorrectanswer={
  //     //   ia:body.results.incorrect_answers
  //     // }

  //     // console.log(JSON.stringify(body.response_code));// Print the HTML for the Google homepage.
  //     // console.log(obj);

  //   });
  //   // console.log("asdadsasdadsas---------------------------------"+joie.parth);
  //   db.User.findOne({ where: { id: req.user.id } }).then(function (user) {
  //     res.render("dashboard", {
  //       isUser: true,
  //       user: user,
  //       final,
  //       question1,
  //       question2,
  //       question3,
  //       question4,
  //       question5

  //     });

  //   });
  // });

  //Load game
  app.get("/question", isLoggedIn, function (req, res) {
    console.log(req.user);
    db.User.findOne({ where: { id: req.user.id } }).then(function (user) {
      res.render("question", {
        isUser: true,
        user: user
      });
    });
  });
  app.get("/game", isLoggedIn, function (req, res) {
    console.log(req.user);
    db.User.findOne({ where: { id: req.user.id } }).then(function (user) {
      res.render("game", {
        isUser: true,
        user: user
      });
    });
  });

  //Load sign in page on logout
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  //Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
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
