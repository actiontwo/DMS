var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
    subViews: {},
    initialize: function() {        
        this.listenTo(this.collection, 'add reset destroy', this.render);  
        this.render();
    },
    render: function() {
        this.$el.html(Templates['menu/view_menu']({'dish_menu':this.collection.toJSON(),'list':dishListCollection.toJSON()}));
        for (i in this.collection.models) {
            var model = this.collection.models[i];
            var submenu_view = new SubMenuView({model:model,el:this.$('tr[data-id="' + model.id + '"]')});
            submenu_view.render();   
            this.subViews[model.id] =  submenu_view;
        }        
    },
});