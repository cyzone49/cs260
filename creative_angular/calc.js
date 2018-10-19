angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective );
  
let myData = {};
let conversion = "USDUSD";

function mainCtrl ($scope) {
    $scope.users = [];
    
    let myurl = "http://www.apilayer.net/api/live?access_key=7ca7f494095fc98d35e85a85063256be";
    $.getJSON(myurl, function(data) {
    })
        .done(function(parsed_json) {
            console.log('getJSON request succeeded!');
            generate_selection( parsed_json );
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming "+jqXHR.responseText);
        })
        .always(function() { 
            console.log('getJSON request ended!');
        });
    
    $scope.convertThis = function (user) {
        // console.log("user amount = " + parseFloat(user.amount) + " type of " + typeof(parseFloat(user.amount)));
        let amountConverted = parseFloat(user.amount)
        if ( !( conversion === "USDUSD" )) {
            // console.log("conversion = " + conversion + ", amountConverted original = " + amountConverted + " type " + typeof(amountConverted));
            // console.log(myData.quotes[conversion] + " of type " + typeof(myData.quotes[conversion]));
            amountConverted = amountConverted * myData.quotes[conversion];
            // console.log("amountConverted = " + amountConverted)
        }
        $scope.users.push({
            amountUSD: financial(user.amount),
            amountConverted: financial(amountConverted),
            convertDestination: conversion.substr(3)
        })
        // user.amount = "";
        user.amountConverted = "";
    };
    
    $( '#combobox' ).on(
		'change', function( e ) {
            conversion = this.options[e.target.selectedIndex].value;
		}
	);
	
}


function generate_selection( data ){
    // console.log("starting generate_selection. data = ");
    myData = data;
    let quotes = myData.quotes;
    let html_result = '<option value="" disabled selected>Select Conversion Option</option>';
    for (let k in quotes ) {
        html_result += '<option value=\"' + k + '\">' + k.substr(0,3) + ' to ' + k.substr(3, 5) + '</option>';
    }
    $("#combobox").html(html_result);
    // console.log("ending generate_selection");
}

function financial(x) {
    let result = Number.parseFloat(x).toFixed(2);
    return result;
}
 
function avatarDirective() {
    return {
        scope: {
         user: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            '<div class="ConversionResult">' +
                '<h4>{{user.amountUSD}} USD = {{user.amountConverted}} {{user.convertDestination}}</h4>' + 
            '</div>'
        ),
    };

}