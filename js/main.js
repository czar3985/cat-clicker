//Global Variables
var numOfClicksCat1 = 0;
var numOfClicksCat2 = 0;

//Constants
const catName1 = 'Myawok';
const catName2 = 'Mingming';


$(function () {
    // Update the cat names
    $('#cat-name-1').text(catName1);
    $('#cat-name-2').text(catName2);
});


// Update the number of clicks with picture clicks
$('#cat-image-1').click(function () {
    numOfClicksCat1++;
    $('#click-counter-1').text(numOfClicksCat1.toString());
});


$('#cat-image-2').click(function () {
    numOfClicksCat2++;
    $('#click-counter-2').text(numOfClicksCat2.toString());
});
