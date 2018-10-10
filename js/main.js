$(function () {

    var model = {
        cats: [],
        selectedCat: 0,

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
            // change selection in view first before updating model
            view.renderSelection(id);
            model.selectedCat = id;
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

        renderSelection: function (newCat) {
            var prevCat = octopus.getSelectedCatId();
            var prevCatLinkElement = this.$catList.find('[data-id=' + prevCat.toString() + ']');
            var newCatLinkElement = this.$catList.find('[data-id=' + newCat.toString() + ']');

            // When new cat selected, change highlights at the sidebar
            if (prevCat !== newCat) {
                $(prevCatLinkElement).toggleClass('selected-cat');
                $(newCatLinkElement).toggleClass('selected-cat');
            }
            else if (!($(newCatLinkElement).hasClass('selected-cat')))
                $(newCatLinkElement).toggleClass('selected-cat');

            // fix the display area
        },

        initDisplayArea: function () { },

        renderDisplayArea: function () { },

        init: function () {
            this.cats = octopus.getAllCats();
            this.initSidebar();

            // select first cat in list
            view.renderSelection(octopus.getSelectedCatId());
        }
    };

    octopus.init();
});
