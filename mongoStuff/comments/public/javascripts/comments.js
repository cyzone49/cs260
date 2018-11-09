$(document).ready(function() {
  
  $("#postComment").click(function() {
      // console.log("clicked");
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      // console.log(myobj)
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $("#done").html(textStatus);
        }
      })
  });
  
  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })
  
  $("#getCommentsFromUser").click(function() {
    var curr_user = $("#userToGrabComments").val();
    $.getJSON('comment', function(data) {
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        if ( com.Name == curr_user ) {
          everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";  
        }
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })
  
  $("#deleteComments").click(function() {
    console.log("deleteComments clicked");
    var url = "comment";
    $.ajax({
      url:url,
      type: "DELETE"
    });
    $("#done").html("Delete operation: success");
  });
  
  
});