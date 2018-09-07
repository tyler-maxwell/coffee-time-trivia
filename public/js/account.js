//Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#collapseOne").collapse("hide");

  //Display the signup/signin modal
  $("#modalBtn").on("click", function(event) {
    event.preventDefault();
    $("#login-modal").modal("show");
  });

  //Sign up user
  $("#createSubmit").on("click", function(event) {
    event.preventDefault();

    var username = $("#usernameCreate")
      .val()
      .trim();
    var password = $("#passwordCreate")
      .val()
      .trim();
    var check = $("#passwordCheck")
      .val()
      .trim();

    if (password === check) {
      var user = {
        username: username,
        password: password
      };

      $.post("/api/signup", user, function(result) {
        //Currently returns the html as a string. Hotfix is to redirect user to intended url upon completion of post request via client js.
        console.log(result);
        window.location.assign("/dashboard");
      });
    } else {
      console.log("password does not match");
    }
  });

  //Sign in user
  $("#loginSubmit").on("click", function(event) {
    event.preventDefault();

    var username = $("#usernameInput")
      .val()
      .trim();
    var password = $("#passwordInput")
      .val()
      .trim();

    var user = {
      username: username,
      password: password
    };

    $.post("/api/signin", user, function(result) {
      //Currently returns the html as a string. Hotfix is to redirect user to intended url upon completion of post request via client js.
      console.log(result);
      window.location.assign("/dashboard");
    });
  });
});
