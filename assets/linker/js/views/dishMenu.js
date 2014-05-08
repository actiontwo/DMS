var DishMenuView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'dish_menu',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset', this.render);
	},
	render: function() {
		this.$el.html(Templates['menu/view_menu']({menu:this.collection.toJSON()}));
	}
})