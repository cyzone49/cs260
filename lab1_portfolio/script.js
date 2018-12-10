var image;
function myFunction() {
    image = true;
    document.getElementById("profile-img").src="images/img-1.png";
}
function change_img() {
    if(image) {
        document.getElementById("profile-img").src="images/img-2.png";
        image = false;
    } else {
        document.getElementById("profile-img").src="images/img-1.png";
        image = true;
    }
}

function change_img_cats() {
    if(image) {
        document.getElementById("cats_img").src="images/img-4.png";
        image = false;
    } else {
        document.getElementById("cats_img").src="images/img-3.png";
        image = true;
    }
}