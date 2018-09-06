$(function () {
    var approvedArr = $("#approvedDisapproved").data("approved");
    var disapprovedArr = $("#approvedDisapproved").data("disapproved");
    console.log(approvedArr, disapprovedArr);
    appSum = 0;
    disSum = 0;
    for (var i = 0; i < approvedArr.length; i++) {
        appSum += approvedArr[i];
        disSum += disapprovedArr[i];
    }
})