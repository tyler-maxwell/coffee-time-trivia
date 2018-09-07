$(function() {
  //Global variables
  var victory;
  var userId = $("#username").attr("data-id");
  var questionId = $("#question").attr("data-id");
  var approved = parseInt($("#question").attr("data-approved"));
  var disapproved = parseInt($("#question").attr("data-disapproved"));
  var correctGuesses = parseInt($("#question").attr("data-correctGuesses"));
  var incorrectGuesses = parseInt($("#question").attr("data-incorrectGuesses"));
  var total = correctGuesses + incorrectGuesses;
  var correctGuessespercentagefinal = Math.floor(
    (correctGuesses * 100) / total
  );
  var incorrectGuessespercentagefinal = Math.floor(
    (incorrectGuesses * 100) / total
  );

  //Answer chosen event
  $(".answerBtn").on("click", function(event) {
    event.preventDefault();

    var value = $(this).attr("data-value");
    var answer = $(this).attr("data-answer");
    var newRound = {
      UserId: userId,
      QuestionId: questionId
    };

    $.post("/api/rounds", newRound, function(response) {
      $.get("/api/questions/" + questionId, function(result) {
        var userUpdate = {
          id: $("#username").attr("data-id")
        };
        if (value === answer) {
          victory = true;
          userUpdate.correct = parseInt($("#correct").text()) + 1;
        } else {
          victory = false;
          userUpdate.wrong = parseInt($("#incorrect").text()) + 1;
        }
        $.ajax({
          method: "PUT",
          url: "/api/users",
          data: userUpdate
        }).then(function() {
          showAnswer(victory, answer, result);
        });
      });
    });
  });

  //Display information after question is answered
  showAnswer = function(victory, answer, result) {
    //Empty div
    $("#gamespace").empty();

    //Update score
    var total = parseInt($("#total").text()) + 1;
    $("#total").text(total);

    if (victory) {
      var correct = parseInt($("#correct").text()) + 1;
      $("#correct").text(correct);
    } else {
      var incorrect = parseInt($("#incorrect").text()) + 1;
      $("#incorrect").text(incorrect);
    }

    //Display answer
    var outcome = $("<h2>");
    if (victory) {
      outcome.text("You are correct!");
    } else {
      outcome.text("You are incorrect!");
    }
    var head = $("<h3>");
    head.text("The answer is:");
    var ans = $("<h4>");
    if (parseInt(answer) === 1) {
      ans.text(result.answer1);
    } else if (parseInt(answer) === 2) {
      ans.text(result.answer2);
    } else if (parseInt(answer) === 3) {
      ans.text(result.answer3);
    } else if (parseInt(answer) === 4) {
      ans.text(result.answer4);
    }
    $("#gamespace").append(outcome);
    $("#gamespace").append(head);
    $("#gamespace").append(ans);

    //Display chart
    var chart = $("<div>");
    chart.attr("class", "chart-container");
    var chartHead = $("<h3>");
    chartHead.text("Community Score");
    var canvas = $("<canvas>");
    canvas.attr("id", "myChart");
    chart.append(chartHead);
    chart.append(canvas);
    $("#charts").append(chart);
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Correct %", "Incorrect %"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              correctGuessespercentagefinal,
              incorrectGuessespercentagefinal
            ],
            backgroundColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
            borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
            borderWidth: 3
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });

    //Display voting
    var prompt = $("<h3>");
    prompt.text("Was this a good trivia question?");
    var upvoteBtn = $("<button>");
    upvoteBtn.attr("class", "btn btn-primary");
    upvoteBtn.attr("id", "upvoteBtn");
    upvoteBtn.text("Yes");
    var downvoteBtn = $("<button>");
    downvoteBtn.attr("class", "btn btn-primary");
    downvoteBtn.attr("id", "downvoteBtn");
    downvoteBtn.text("No");
    var skipBtn = $("<button>");
    skipBtn.attr("class", "btn btn-primary");
    skipBtn.attr("id", "skipBtn");
    skipBtn.text("Skip Voting");

    $("#voting").append(prompt);
    $("#voting").append(upvoteBtn);
    $("#voting").append(downvoteBtn);
    $("#voting").append(skipBtn);
  };

  //Upvote event
  $(document.body).on("click", "#upvoteBtn", function(event) {
    event.preventDefault();

    if (victory) {
      var questionUpdate = {
        id: questionId,
        approved: approved + 1,
        correctGuesses: correctGuesses + 1
      };
    } else {
      var questionUpdate = {
        id: questionId,
        approved: approved + 1,
        incorrectGuesses: incorrectGuesses + 1
      };
    }

    $.ajax({
      method: "PUT",
      url: "/api/questions",
      data: questionUpdate
    }).then(function() {
      window.location.assign("/game");
    });
  });

  //Downvote event
  $(document.body).on("click", "#downvoteBtn", function(event) {
    event.preventDefault();

    if (victory) {
      var questionUpdate = {
        id: questionId,
        disapproved: disapproved + 1,
        correctGuesses: correctGuesses + 1
      };
    } else {
      var questionUpdate = {
        id: questionId,
        disapproved: disapproved + 1,
        incorrectGuesses: incorrectGuesses + 1
      };
    }

    $.ajax({
      method: "PUT",
      url: "/api/questions",
      data: questionUpdate
    }).then(function() {
      window.location.assign("/game");
    });
  });

  //Skip voting event
  $(document.body).on("click", "#skipBtn", function(event) {
    event.preventDefault();
    window.location.assign("/game");
  });
});
