var CreateDishView = Backbone.View.extend({
    render: function() {
        this.$el.html(Templates['menu/dish_menu'](this.model.attributes));
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this.el;
    },
    events: {
        'change input, select': 'updateModel',
        'keyup  input.dish, select': 'FillDish'
    },
    updateModel: function(ev) {
        this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
    },
    FillDish:function(ev){
        fillDish(ev,this);
    }
   
})

