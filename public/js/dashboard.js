$(function() {
  var approvedArr = $("#approvedDisapproved").data("approved");
  var disapprovedArr = $("#approvedDisapproved").data("disapproved");
  console.log(approvedArr, disapprovedArr);
  var appSum = 0;
  var disSum = 0;
  for (var i = 0; i < approvedArr.length; i++) {
    appSum += approvedArr[i];
    disSum += disapprovedArr[i];
  }

  var ctx1 = $("#correctIncorrect");
  var correctIncorrect = new Chart(ctx1, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [
            $("#correctIncorrect").data("correct"),
            $("#correctIncorrect").data("wrong")
          ],
          backgroundColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
          borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      }
    }
  });

  var ctx2 = $("#approvedDisapproved");
  var approvedDisapproved = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Approved", "Disapproved"],
      datasets: [
        {
          data: [appSum, disSum], //need to add in variables for approved/disapproved here
          backgroundColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
          borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      }
    }
  });
});
