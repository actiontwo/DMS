var AppRouter = Backbone.Router.extend({
	routes: {
		dish_menu: 'loadDishMenu',
		print_menu:'loadPrintMenu',
		expense_menu: 'loadExpenseMenu',
		create_dish: 'createDish'
	},
	loadDishMenu: function() {
		dishMenuCollection = new DishMenuCollection;
		dishMenuView = new DishMenuView({collection: dishMenuCollection});
		dishMenuCollection.fetch({data:$.param({page:0,number:5})});
		$("#main").html(dishMenuView.el);
	},
	loadPrintMenu:function(){
		printMenuCollection = new DishMenuCollection;
		printMenuView = new PrintMenuView({collection:printMenuCollection});
		printMenuCollection.fetch();
		$('#main').html(printMenuView.el);
	},
	loadExpenseMenu: function(){
		expenseMenuCollection = new ExpenseMenuCollection;
		expenseMenuView = new ExpenseMenuView({collection: expenseMenuCollection});
		expenseMenuCollection.fetch();
		$("#main").html(expenseMenuView.el);
	},
	createDish: function(){
		dishListCollection = new DishListCollection;
		dishListView = new DishListView({collection:dishListCollection});
		dishListCollection.fetch();
		$('#main').html(dishListView.el);
	}


})

$(function() {
	var appRouter = new AppRouter();	
	Backbone.history.start();
});
