$("#btn").on("click",function(){
    
    
    
    var q1=$("#q1").val().trim();
    var a1=$("#a1").val().trim();
    var a2=$("#a2").val().trim();
    var a3=$("#a3").val().trim();
    var a4=$("#a4").val().trim();
    var c1=$("#c1").val().trim();
    
    if(q1== "" || a1 =="" || a2 =="" ||a3 ==""||a4 ==""||c1==""){
                var text= "Not successfully!!!"
        // $(".modal-body #textBody").val(text);
       var p = $("<p>");
       p.text(text);
       $(".modal-body").append(p);
        $('#exampleModal').modal('show');

    
    } 
    else{
    
    var obj1 = {
        q1,
        a1,
        a2,
        a3,
        a4,
        c1
    }
    $.ajax("/submitquestion", {
        'method': 'POST',
        data: obj1,
        'success': function() {
           
        
        }
    })
    var text= "Successfully Done!!!"
    // $(".modal-body #textBody").val(text);
   var p = $("<p>");
   p.text(text);
   $(".modal-body").append(p);
    $('#exampleModal').modal('show');

}
})