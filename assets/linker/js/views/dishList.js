var DishListView = Backbone.View.extend({
    tagName: 'div',
    className: 'mn-create-dish',
    id: 'create_dish',
    initialize: function() {
        this.listenTo(this.collection, 'sync reset sort', this.render);
    },
    render: function() {
        this.$el.html(Templates['menu/create_dish']({
            listdish: this.collection.toJSON()
        }));
        init();
        
    },
    events:{
        'click #btn-save': 'saveDish'
    },
    saveDish: function(){
        var model = new DishListModel;
        model.set({dish:$('#dishname').val()});
        model.save();
        this.collection.add(model);
    }
});