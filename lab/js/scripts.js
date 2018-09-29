$(document).ready(function() {
    var weather_output = "";
    var stack_output = "";
    var img_url = "";
    $( "#cityField" ).keyup(function() {
        $("#txtHint").text("Keyup");

        //make sure input is valid with upper or lower case
        var str = $("#cityField").val();
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        var value = str;
        var myurl= "https://api.wunderground.com/api/b2e988c7cf10661e/geolookup/conditions/q/UT/";
        var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+str;
        myurl += value;
        myurl += ".json";
        $.getJSON(url,function(data) {
            var everything;
            everything = "<ul>";
            $.each(data, function(i,item) {
                everything += "<li> "+data[i].city;
            });
            everything += "</ul>";
            $("#txtHint").html(everything);
        });

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
                img_url = "url(";
                if(current_weather == "Clear") {
                    img_url += "img/clear.jpg";
                } else if (current_weather == "Partly Cloudy") {
                    img_url += "img/part-cloudy.jpg";
                } else if (current_weather == "Rainy") {
                    img_url += "img/rainy.jpg";
                } else {
                    img_url += "img/weather.jgp";
                }
                img_url += ");";

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
        $("#weather").css('background-image',img_url);
        $("#weather").css('display','block');
        $("#weather-img").html(img_url);

        e.preventDefault();
    });

    var everything_2 = "";
    var stack_url;
    $( "#searchStack" ).keyup(function() {
        stack_url = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=";
        stack_url += $("#searchStack").val();
        stack_url += "&site=stackoverflow";
        $.ajax({
            url : stack_url,
            dataType : "json",
            success : function(parsed_json) {
                stack_output = "<p>" + JSON.stringify(parsed_json) + "</p>";
                everything_2="<ul>";
                $.each(parsed_json.items,function(index,element){
                    everything_2+="<li><a href=\""+element.link+"\">"+element.title+"</a></li>";
                });
                everything_2+="</ul>";
            }
        });
    });


    $("#searchButton").click(function(e){
        $("#searchResults").html(stack_output );
        // $("#searchResults").html(everything_2);
        e.preventDefault();
    });
});