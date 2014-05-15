var CreateMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'mn-create-menu',
    id: 'create_menu',
    subViews: {},
    initialize: function() {    	
        this.listenTo(this.collection, 'add reset destroy', this.render);  
        this.render();
    },
    render: function() {
        this.$el.html(Templates['menu/create_menu']({'dish_menu':this.collection.models}));
        var subViews = this.subViews;
        this.$('#create-menu').find('tr').each(function(){
            subViews[$(this).data('cid')].setElement(this);
            subViews[$(this).data('cid')].render();
        });
        return this;
    },
    events:{
    	'click #btn-add'	: 'Add',
    	'click #btn-save'	:'Save',
    },
    Add:function(){
    	var model = new DishMenuModel;        
        this.subViews[model.cid] = new CreateDishView({model:model});        
        this.collection.add(model);
    },
    Save:function(){
        _.each(this.collection.models, function(model) {
            model.save();
        })
    }
});