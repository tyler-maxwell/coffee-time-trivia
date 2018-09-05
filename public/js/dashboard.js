$(function () {
    var userId = $("#correctIncorrect").data("user");
    $.get("/api/user/question/info/" + userId, function (data) {
        console.log(data);
        var qCount = data.question.length;
        var appSum = 0;
        var disSum = 0;
        for (var i = 0; i < data.approved.length; i++) {
            appSum += data.approved[i];
            disSum += data.disapproved[i];
        }
    })
})