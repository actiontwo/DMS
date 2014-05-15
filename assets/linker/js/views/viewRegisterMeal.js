var ViewRegisterMealView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'view_register_meal',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
        this.collection.sort_order = {
            date: 1,
            lunch: 1,
            dinner: 1,
        };

	},
	render: function() {
		this.$el.html(Templates['registerMeal/viewRegisterMeal']({
			viewRegisterMeals: this.collection.toJSON()
		}));
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.viewRegisterMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });
        init();
	}
});