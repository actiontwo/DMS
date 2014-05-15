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
		'change input, select' : 'updateModel'
	},
	updateModel:function(ev) {
		console.log($(ev.currentTarget).val());
		this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
	}
})