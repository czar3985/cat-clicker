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
            octopus.getCat(model.selectedCat);
        },

        setSelectedCat: function (id) {
            model.selectedCat = id;
        },

        init: function () {
            model.init();
            view.initSidebar();
            view.initDisplayArea();
        }
    };

    var view = {
        initSidebar: function () {
            var fragment = document.createDocumentFragment();
            view.renderSidebar(fragment);
        },

        renderSidebar: function (fragment) { },

        initDisplayArea: function (fragment) {
            view.renderDisplayArea();
        },

        renderDisplayArea: function () { }
    };

    octopus.init();
});
