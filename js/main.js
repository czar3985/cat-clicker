$(function () {

    var model = {
        cats: [],

        selectedCat: 0,

        getCats: function () {
            return this.cats;
        },

        getSelectedCat: function () {
            return this.selectedCat;
        },

        setSelectedCat: function (catIndex) {
            this.selectedCat = catIndex;
        },

        init: function () {
            this.cats = [
                { name: 'Steve', clicks: 0, image: 'img/adorable_640.jpg' },
                { name: 'Tony', clicks: 0, image: 'img/cat_640.jpg' },
                { name: 'Thor', clicks: 0, image: 'img/kitty_640.jpg' },
                { name: 'Bruce', clicks: 0, image: 'img/sleepy_640.jpg' },
                { name: 'Clint', clicks: 0, image: 'img/treetop_640.jpg' }
            ];
        }
    };

    var octopus = {
        getCats: function () {
            return model.getCats();
        },

        getSelectedCat: function () {
            return model.getSelectedCat();
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
