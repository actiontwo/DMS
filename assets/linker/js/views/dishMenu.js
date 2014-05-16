var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
    subViews: {},
    initialize: function() {        
        this.listenTo(this.collection, 'add reset destroy sort', this.render);  
        this.render();
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
    render: function() {
        this.$el.html(Templates['menu/view_menu']({'dish_menu':this.collection.toJSON(),'list':dishListCollection.toJSON()}));
        for (i in this.collection.models) {
            var model = this.collection.models[i];
            var submenu_view = new SubMenuView({model:model,el:this.$('tr[data-id="' + model.id + '"]')});
            submenu_view.render();   
            this.subViews[model.id] =  submenu_view;
        }
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });        
    },
    events:{
        'click th':'sortMenu',
    },
    //Add Menu Sort functionn
    sortMenu:function(ev){
        var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    }
});