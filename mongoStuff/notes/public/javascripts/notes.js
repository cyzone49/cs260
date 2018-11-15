$(document).ready(function() {
  
  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
  
  $('#time').val(localISOTime);
  
  $("#postNote").click(function() {
      
      // var myDate = $("#time").val();
      
      var myobj = {Title:$("#title").val(),
                   Location:$("#location").val(),
                   Time: $("#time").val(),
                   Description:$("#description").val()
      };
      
      jobj = JSON.stringify(myobj);
      
      var url = "note";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $("#done").html("Adding new Note item: " + textStatus);
        }
      })
  });
  
  $("#getNotes").click(function() {
    $.getJSON('note', function(data) {
      
      var everything = "<ul>";
      for(var item in data) {
        com = data[item];
        if ( isLate(com.Time) ) {
          everything += "<li><div class='noteItem isLate'>";
          everything += "<p><em>This event is LATE! </em></p>";
        } else {
          everything += "<li><div class='noteItem'>";
        }
        
        let curr_time = com.Time.split("T");
        let date      = formatDate( curr_time[0] );
        let time      = formatAMPM( curr_time[1] );
        
        everything += '<p ><i>Title:</i><strong class="noteTitle" > ' + com.Title + "</strong></p>";
        everything += '<p class="noteDetails" ><i>at Location:</i><strong> ' + com.Location + "</strong></p>";
        everything += '<p class="noteDetails" ><i>on Date:</i><strong> ' + date + " -- at " + time + "</strong></p>";
        everything += '<p class="noteDetails" ><i>Description:</i><strong> ' + com.Description + "</strong></p>";
        everything += "</div></li>";
      }
        
      everything += "</ul>";
      $("#notes").html(everything);
    });
  });
  
  $("#getUpcomingNotes").click(function() {
    $.getJSON('note', function(data) {
      
      var everything = "<ul>";
      for(var item in data) {
        com = data[item];
        if ( isLate( com.Time ) === false ) {
          everything += parseJsonItem( com );
        }
      }
        
      everything += "</ul>";
      $("#notes").html(everything);
    });
  });
  
  $("#getLateNotes").click(function() {
    $.getJSON('note', function(data) {
      
      var everything = "<ul>";
      for(var item in data) {
        com = data[item];
        if ( isLate( com.Time ) ) {
          everything += parseJsonItem( com, true );
        }
      }
        
      everything += "</ul>";
      $("#notes").html(everything);
    });
  });
  
  $("#deleteNotes").click(function() {
    console.log("deleteNotes clicked");
    var url = "note";
    $.ajax({
      url:url,
      type: "DELETE"
    });
    $("#done").html("Delete operation: success");
  });

  function parseJsonItem( com, isLate=false ) {
    let everything = "";
    if ( isLate ) {
      everything += "<li><div class='noteItem isLate'>";
      everything += "<p><em>This event is LATE! </em></p>";
    } else {
      everything += "<li><div class='noteItem'>";
    }
    
    let curr_time = com.Time.split("T");
    let date      = formatDate( curr_time[0] );
    let time      = formatAMPM( curr_time[1] );
    
    everything += '<p ><i>Title:</i><strong class="noteTitle" > ' + com.Title + "</strong></p>";
    everything += '<p class="noteDetails" ><i>at Location:</i><strong> ' + com.Location + "</strong></p>";
    everything += '<p class="noteDetails" ><i>on Date:</i><strong> ' + date + " -- at " + time + "</strong></p>";
    everything += '<p class="noteDetails" ><i>Description:</i><strong> ' + com.Description + "</strong></p>";
    everything += "</div></li>";
    
    return everything;
  }
  
  function formatDate(inStr) {
    let date = inStr.split("T")[0].split("-");
    return date[1] + "/" + date[2] + "/" + date[0];
  }

  function formatAMPM(inStr) {
    let hours = inStr.split(":")[0];
    let minutes = inStr.split(":")[1];
    let ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return hours + ':' + minutes + ' ' + ampm;
  }
  
  function isLate( inStr ) {

    let inDate = inStr.split("T");
    let date_part = inDate[0];
    
    if ( date_part < localISOTime.substr(0,10) ) {
      // console.log("late date");
      return true;
    } else if ( date_part > localISOTime.substr(0,10) ) {
      // console.log("early date");
      return false;
    } else {
      // console.log("Not yet");
      let time_part = inDate[1];
      time_part < localISOTime.substring(11) ? console.log("late time") :  console.log("early time");
      return ( time_part < localISOTime.substring(11) ? true : false );
    }
  }
  
});