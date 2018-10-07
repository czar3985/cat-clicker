// Global Variable
var numOfClicks = [0, 0, 0, 0, 0];
var selectedIndex = 0;

// Constants
const catName = ['Steve', 'Tony', 'Thor', 'Bruce', 'Clint'];
const catImage = [
    'img/adorable_640.jpg',
    'img/cat_640.jpg',
    'img/kitty_640.jpg',
    'img/sleepy_640.jpg',
    'img/treetop_640.jpg'
];

$(function () {
    for (var index = 0; index < numOfClicks.length; index++) {
        // Add cat links to the sidebar
        var $catLink = $('<li class="cat-link"><a>' + catName[index] + '</a></li>');
        $('.cat-list').append($catLink);

        // Add cat tiles to the body
        var fragment = document.createDocumentFragment();

        fragment = $('<div class = "cat-tile"><p>This is ' + catName[index] + '</p>');
        var $catImage = $('<img class="cat-image" src="' + catImage[index] + '" alt="Cat picture" />');
        $(fragment).append($catImage);
        $(fragment).append('<br />');
        var $catClicks = $('<p class="clicks-text"> Number of clicks: 0</p>');
        $(fragment).append($catClicks);
        $(fragment).append('</div>');

        var $catTile = fragment;
        $('.specific-cat').append($catTile);

        // initial selection
        if (index === 0) {
            // Highlight first cat link
            $catLink.toggleClass('selected-cat');
            // Show first cat tile
            $catTile.toggleClass('displayed-cat');
        }

        // Event listeners
        // Use IFFY: Immediately Invoked Function Expression
        // index changes but the inner function returned to the event listener
        // would always have the copy of the index at the time it was invoked
        $catLink.click((function (indexCopy) {
            return function () {
                var newElement = (indexCopy + 1).toString();
                var previousElement = (selectedIndex + 1).toString();

                // change highlight of previously selected link and newly-selected link
                $('ul li:nth-child(' + newElement + ')').toggleClass('selected-cat');
                $('ul li:nth-child(' + previousElement + ')').toggleClass('selected-cat');

                // change css display of indexcopy(nth) child of specific-cat
                $('.specific-cat div:nth-child(' + newElement + ')').toggleClass('displayed-cat');
                $('.specific-cat div:nth-child(' + previousElement + ')').toggleClass('displayed-cat');

                // change css display of previously selected child
                selectedIndex = indexCopy;
            };
        })(index));

        $catImage.click((function (indexCopy) {
            return function () {
                var childCount = (indexCopy + 1).toString();

                numOfClicks[indexCopy]++;
                $catTile = $('.specific-cat div:nth-child(' + childCount + ')');
                $elementToChange = $catTile.find('.clicks-text');
                $elementToChange.text('Number of clicks: ' + numOfClicks[indexCopy].toString());
            };
        })(index));
    }
});
