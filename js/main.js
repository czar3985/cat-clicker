$(function () {

    var model = {
        cats: [],
        selectedCat: 0,
        isAdmin: false,

        init: function () {
            this.cats = [
                { id: 1, name: 'Steve', clicks: 0, image: 'img/adorable_640.jpg' },
                { id: 2, name: 'Tony', clicks: 0, image: 'img/cat_640.jpg' },
                { id: 3, name: 'Thor', clicks: 0, image: 'img/kitty_640.jpg' },
                { id: 4, name: 'Bruce', clicks: 0, image: 'img/sleepy_640.jpg' },
                { id: 5, name: 'Clint', clicks: 0, image: 'img/treetop_640.jpg' }
            ];

            this.selectedCat = 1;
        }
    };

    var octopus = {
        getAllCats: function () {
            return model.cats;
        },

        getCat: function (id) {
            var cat = model.cats.find(item => {
                return item.id === id;
            });

            return cat; // undefined if id is not found
        },

        getSelectedCatId: function () {
            return this.getCat(model.selectedCat).id;
        },

        setSelectedCatId: function (id) {
            // unselect in UI first, set new id in model then render
            view.unselectCat(model.selectedCat);
            model.selectedCat = id;
            view.renderSelection(id);
        },

        incrementClicks: function (id) {
            model.cats.find(item => {
                if (item.id === id) {
                    item.clicks++;
                    view.updateClicks(id, item.clicks);
                }
            });
        },

        changeAdminMode: function (adminMode) {
            if (model.isAdmin !== adminMode) {
                model.isAdmin = adminMode;

                if (adminMode)
                    view.renderAdminArea();
                else
                    view.hideAdminArea();
            }
        },

        init: function () {
            model.init();
            view.init();
        }
    };

    var view = {
        initSidebar: function () {
            // grab elements and html for use in render
            this.$catList = $('.cat-list');
            this.catNameTemplate = $('script[data-template="catName"]').html();

            // event listener to listen for cat selection
            this.$catList.on('click', '.cat-link', function () {
                var id = $(this).data().id;
                octopus.setSelectedCatId(id);
            });

            this.renderSidebar();
        },

        renderSidebar: function () {
            // populate the list at the sidebar
            var fragment = document.createDocumentFragment();
            var catNameTemplate = this.catNameTemplate;

            this.cats.forEach(function (cat) {
                var $catLink = catNameTemplate
                    .replace(/{{id}}/g, cat.id)
                    .replace(/{{name}}/g, cat.name);
                $(fragment).append($catLink);
            });
            $(this.$catList).append(fragment);
        },

        unselectCat: function (catId) {
            var catLinkElement = this.$catList.find('[data-id=' + catId.toString() + ']');
            if ($(catLinkElement).hasClass('selected-cat'))
                $(catLinkElement).toggleClass('selected-cat');
        },

        renderSelection: function (catId) {
            var catLinkElement = this.$catList.find('[data-id=' + catId.toString() + ']');

            if (!$(catLinkElement).hasClass('selected-cat'))
                $(catLinkElement).toggleClass('selected-cat');

            // fix the display area
            this.initDisplayArea(catId);
        },

        initDisplayArea: function (catId) {
            // grab elements and html for use in render
            this.$catArea = $('.specific-cat');
            this.catDisplayTemplate = $('script[data-template="catDisplay"]').html();

            // event listener to listen for image clicks
            this.$catArea.off().on('click', '.cat-image', function () {
                var id = $(this).parents('.cat-tile').data().id;
                octopus.incrementClicks(id);
            });

            this.renderDisplayArea();
        },

        renderDisplayArea: function () {
            var catDisplayTemplate = this.catDisplayTemplate;
            var currentCat = octopus.getCat(octopus.getSelectedCatId());

            var node = catDisplayTemplate
                .replace(/{{name}}/g, currentCat.name)
                .replace(/{{image}}/g, currentCat.image)
                .replace(/{{id}}/g, currentCat.id)
                .replace(/{{clicks}}/g, currentCat.clicks);
            $(this.$catArea).html(node);
        },

        updateClicks: function (id, clicks) {
            var $elementToChange = this.$catArea.find('.clicks-text');
            $elementToChange.text('Number of clicks: ' + clicks.toString());
        },

        initAdminArea: function () {
            this.adminArea = $('.admin-area');

            $("button").click(function () {
                var clickedElement = $(this).attr('id');

                if (clickedElement === 'admin-button')
                    octopus.changeAdminMode(true);
                else if (clickedElement === 'cancel-button')
                    octopus.changeAdminMode(false);
            });
        },

        renderAdminArea: function () {
            $(this.adminArea).css('display', 'block');

            // get selected cat details and put as values in the input boxes
            var cat = octopus.getCat(model.selectedCat);
            $('#name').val(cat.name);
            $('#imageUrl').val(cat.image);
            $('#clicks').val(cat.clicks);
        },

        hideAdminArea: function () {
            $(this.adminArea).css('display', 'none');
        },

        init: function () {
            this.cats = octopus.getAllCats();
            this.initSidebar();

            // select first cat in list
            this.renderSelection(octopus.getSelectedCatId());

            this.initAdminArea();
        }
    };

    octopus.init();
});
