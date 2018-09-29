var quotes;
var wallpapers;
var response;
var index = -1;
window.onload = function() {
	quotes = [
	    "A dog is the only thing on earth that loves you more than you love yourself - Josh Billings",
    	"Money can buy you a fine dog, but only love can make him wag his tail - Kinky Friedman",
    	"It's not the size of the dog in the fight, it's the size of the fight in the dog - Mark Twain",
    	"The bond with a true dog is as lasting as the ties of this earth will ever be - Konrad Lorenz",
    	"You like doge?"
    	];
    	
	wallpapers = [
		"rgb(148, 197, 118)",
		"rgb(175, 136, 202)",
		"rgb(255, 218, 207)",
		"rgb(175, 214, 254)"
		]

}
function get_quote() {
	index = ran_gen(quotes);
	response = "<p>" + quotes[index] + "</p>";
	document.getElementById("quote").innerHTML = response;
}

function get_wall() {
	index = ran_gen(wallpapers);
	document.getElementById("quote").style.background = wallpapers[index];
}

function ran_gen(arr) {
	var new_index = index;
	while(new_index == index) {
		new_index = Math.floor(Math.random() * Math.floor(arr.length));
	}
	return new_index;
}
