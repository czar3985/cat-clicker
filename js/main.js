var numOfClicks = 0;

$('.cat-image').click(function () {
    numOfClicks++;
    $('.click-counter').text(numOfClicks.toString());
});