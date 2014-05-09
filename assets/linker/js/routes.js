var AppRouter = Backbone.Router.extend({
	routes: {
		dish_menu: 'loadDishMenu',
		expense_menu: 'loadExpenseMenu'
	},
	loadDishMenu: function() {
		dishMenuCollection = new DishMenuCollection;
		dishMenuView = new DishMenuView({collection: dishMenuCollection});
		dishMenuCollection.fetch();
		$("#main").html(dishMenuView.el);
	},
	loadExpenseMenu: function(){
		expenseMenuCollection = new ExpenseMenuCollection;
		expenseMenuView = new ExpenseMenuView({collection: expenseMenuCollection});
		expenseMenuCollection.fetch();
		$("#main").html(expenseMenuView.el);
	}
})

$(function() {
	var appRouter = new AppRouter();	
	Backbone.history.start();
});
