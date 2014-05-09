ExpenseMenuView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'expense_menu',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove', this.render);
	},
	render: function() {
		this.$el.html(Templates['expense/expense_menu']({
			expense: this.collection.toJSON()
		}));
	}
});