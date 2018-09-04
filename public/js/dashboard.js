// var userguess;
$("#btn").on("click",function(){

    var answerchosen1;
    var answerchosen2;
    var answerchosen3;
    var answerchosen4;
    var answerchosen5;
    var rightanswer1;
    var rightanswer2;
    var rightanswer3;
    var rightanswer4;
    var rightanswer5;
    var rightanswerscore=0;
    var wronganswerscore=0;
    answerchosen1=$("#selectanswerid1").val().trim();
    answerchosen2=$("#selectanswerid2").val().trim();
    answerchosen3=$("#selectanswerid3").val().trim();
    answerchosen4=$("#selectanswerid4").val().trim();
    answerchosen5=$("#selectanswerid5").val().trim();
    console.log(answerchosen1);
    console.log(answerchosen2);
    console.log(answerchosen3);
    console.log(answerchosen4);
    console.log(answerchosen5);
    rightanswer1=$("#rightanswer1").val().trim();
    rightanswer2=$("#rightanswer2").val().trim();
    rightanswer3=$("#rightanswer3").val().trim();
    rightanswer4=$("#rightanswer4").val().trim();
    rightanswer5=$("#rightanswer5").val().trim();
    console.log(rightanswer1);
    console.log(rightanswer2);
    console.log(rightanswer3);
    console.log(rightanswer4);
    console.log(rightanswer5);
    if(answerchosen1===rightanswer1)
    {
        rightanswerscore=rightanswerscore + 1;
    }
    else
    {
        wronganswerscore=wronganswerscore + 1;
    }
    if(answerchosen2===rightanswer2)
    {
        rightanswerscore=rightanswerscore + 1;
    }
    else
    {
        wronganswerscore=wronganswerscore + 1;
    }
    if(answerchosen3===rightanswer3)
    {
        rightanswerscore=rightanswerscore + 1;
    }
    else
    {
        wronganswerscore=wronganswerscore + 1;
    }
    if(answerchosen4===rightanswer4)
    {
        rightanswerscore=rightanswerscore + 1;
    }
    else
    {
        wronganswerscore=wronganswerscore + 1;
    }
    if(answerchosen5===rightanswer5)
    {
        rightanswerscore=rightanswerscore + 1;
    }
    else
    {
        wronganswerscore=wronganswerscore + 1;
    }
    console.log("Right Answer:"+rightanswerscore);
    console.log("Wrong Answer:"+wronganswerscore);  
    

})

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