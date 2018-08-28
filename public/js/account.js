// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#modalBtn").on("click", function(event) {
    event.preventDefault();
    $("#login-modal").modal("show");
  });

  // Create account
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

      $.post("/api/users", user, function(result) {
        console.log(result);
      });
    } else {
      console.log("password does not match");
    }
  });

  // Sign in
  $("#loginSubmit").on("click", function(event) {
    event.preventDefault();

    var username = $("#usernameInput")
      .val()
      .trim();
    var password = $("#passwordInput")
      .val()
      .trim();

    $.get("/api/users/" + username + "/" + password, function(result) {
      console.log(result);
    });
  });
});
