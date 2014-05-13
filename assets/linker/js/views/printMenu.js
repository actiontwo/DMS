var PrintMenuView = Backbone.View.extend({
	 tagName: 'div',
    className: 'mn-print-menu',
    id: 'print_menu',
    initialize: function() {
        this.listenTo(this.collection, 'sync reset sort', this.render);
        this.collection.sort_order = {
            date: 1,
            brunch: 1,
            dish1: 1,
            dish2: 1,
            dish3: 1,
            dish4: 1,
            dish5: 1,
            note: 1
        };
    },
    page:0,
    number:5,
    render: function() {
        this.$el.html(Templates['menu/print_menu']({
            menu: this.collection.toJSON()
        }));
        init();
    },
    events: {
        'click th': 'sortMenu'
    },
    sortMenu: function(ev) {
    	var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    },
});