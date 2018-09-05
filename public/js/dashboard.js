$(function () {
    var userId = $("#correctIncorrect").data("user");
    $.get("/api/user/question/info/" + userId, function (response) {
        var qCount = response.question.length;
        var appSum = 0;
        var disSum = 0;
        for (var i = 0; i < response.approved.length; i++) {
            appSum += response.approved[i];
            disSum += response.disapproved[i];
        }
    })
})