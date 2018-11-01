$(document).ready(function() {
    var weather_output = "";
    var stack_output = "";
    
    $( "#cityField" ).keyup(function() {
        $("#txtHint").text("Keyup");
        
        //make sure input is valid with upper or lower case
        
        // var str = $("#cityField").val();
        var str = $("#cityField").val();
        if ( str === "" ) {
            console.log(("empty"));
            $("#txtHint").text("");
            return;
        }
        
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        
        var url = "getcity?q="+ str;
        
        
        var value = str;
        
        // var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+str;
        
        
        $.getJSON(url,function(data) {
            var everything;
            
            everything = "<ul>";
            console.log("GOING INTO LOOP");
            $.each(data, function(i,item) {
                everything += "<li> "+data[i].city;
            });
            everything += "</ul>";
            $("#txtHint").html(everything);
        });
        
        var myurl= "https://api.wunderground.com/api/b2e988c7cf10661e/geolookup/conditions/q/UT/";
        myurl += value;
        myurl += ".json";
        $.getJSON(myurl,function(data) {
            var everything;
            everything = "<ul>";
            $.each(data, function(i,item) {
                console.log(data[i].city);
                if(data[i].city != undefined) {
                    everything += "<li> "+data[i].city;
                }
            });
            everything += "</ul>";
        })
            .done(function(parsed_json) {
                console.log('getJSON request succeeded!');
                var location = parsed_json['location']['city'];
                var temp_string = parsed_json['current_observation']['temperature_string'];
                var current_weather = parsed_json['current_observation']['weather'];
                everything = "<ul>";
                everything += "<li>Location: "+location;
                everything += "<li>Temperature: "+temp_string;
                everything += "<li>Weather: "+current_weather;
                everything += "</ul>";
                weather_output = everything;

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log('getJSON request failed! ' + textStatus);
                console.log("incoming "+jqXHR.responseText);
            })
            .always(function() { console.log('getJSON request ended!');
            });

    });

    $("#weatherButton").click(function(e){
        var value = $("#cityField").val();
        $("#displayCity").text(value);
        $("#weather").html(weather_output);
        // $("#weather").css('background-image',img_url);
        $("#weather").css('display','block');
        // $("#weather-img").html(img_url);

        e.preventDefault();
    });

    $("#owlbutton").click(function(event) {
        console.log("click from owl recieved");
        event.preventDefault();
        var url = "owl?q=" + $("#owlform").val();
        $.getJSON(url, function(data) {
            console.log(data)
            var everything = "Definition: <ul class='User-list'>";
            $.each(data, function(i, item) {
                everything += "<li>+" + data[i].defenition + "</li>";
            });
            everything += "</ul>";
            console.log(everything);
            $("#owldef").html(everything);
        });
    });
    
});