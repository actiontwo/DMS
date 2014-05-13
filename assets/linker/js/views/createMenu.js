var CreateMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'mn-create-menu',
    id: 'create_menu',
    initialize: function() {
    	this.render();
        this.listenTo(this.collection, 'add reset destroy', this.render);  
    },
    render: function() {
        this.$el.html(Templates['menu/create_menu']({'dish_menu':this.collection.toJSON()}));
        this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this;
    },
    events:{
    	'click #btn-add'	: 'Add',
    	'click #btn-save'	:'Save',
    },
    Add:function(){
    	var model = new DishMenuModel;
        this.collection.add(model);
    },
    Save:function(){
        var model = new DishMenuModel;
        $(this.el).find('tbody').find('tr').each(function(){
             model.set({
                date:   $(this).find('.date').val(),
                brunch: $(this).find('.brunch').val(),
                dish1:  $(this).find('.dish1').val(),
                dish2:  $(this).find('.dish2').val(),
                dish3:  $(this).find('.dish3').val(),
                dish4:  $(this).find('.dish4').val(),
                dish5:  $(this).find('.dish5').val(),
                note:   $(this).find('.note').val()
            }); 
            model.save();
        });
    }
});