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

        getSelectedCat: function () {
            this.getCat(model.selectedCat);
        },

        setSelectedCat: function (id) {
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
            this.catList = $('.cat-list');
            this.catNameTemplate = $('script[data-template="catName"]').html();

            // todo: event listener to listen for cat selection

            this.renderSidebar();
        },

        renderSidebar: function () {
            var fragment = document.createDocumentFragment();
            var catNameTemplate = this.catNameTemplate;

            this.cats.forEach(function (cat) {
                var $catLink = catNameTemplate
                    .replace(/{{id}}/g, cat.id)
                    .replace(/{{name}}/g, cat.name);
                $(fragment).append($catLink);
            });
            $(this.catList).append(fragment);
        },

        initDisplayArea: function () { },

        renderDisplayArea: function () { },

        init: function () {;
            this.cats = octopus.getAllCats();
            this.initSidebar();
            // todo: select first cat in list
        }
    };

    octopus.init();
});
