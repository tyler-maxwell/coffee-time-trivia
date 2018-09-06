// var userguess;
// $("btn").on("click",function(){
//   if(userguess=== correct_answer){
//       correct_answer++;
//       incorrect_answer=0;
//   }
//   else if(userguess===incorrect_answer){
//       incorrect_answer++;
//       correct_answer=0;
//   }
// })
$(function(){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});
});