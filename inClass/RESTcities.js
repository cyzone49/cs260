<script>
$(document).ready(function() {
    $( "#cityField" ).keyup(function() {
        $.getJSON("http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=P",function(data) {
            var everything;
            everything = "<ul>";
            $.each(data, function(i,item) {
              everything += "<li> "+data[i].city;
            });
            everything += "</ul>";
            $("#txtHint").html(everything);
        })
        .done(function() { 
            console.log('getJSON request succeeded!');
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            console.log('getJSON request failed! ' + textStatus); 
            console.log("incoming "+jqXHR.responseText);
        })
        .always(function() {
            console.log('getJSON request ended!');
        });
    });
});
</script>