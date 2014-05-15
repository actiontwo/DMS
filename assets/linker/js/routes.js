var AppRouter = Backbone.Router.extend({
	routes: {
		dish_menu: 'loadDishMenu',
		print_menu:'loadPrintMenu',
		expense_menu: 'loadExpenseMenu',
		create_dish: 'createDish',
		expense_menu: 'loadExpenseMenu',
		create_dish: 'createDish',
		create_menu: 'createMenu',
		deposit:'loadDeposit',
		register_meal: 'loadRegisterMeal'
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
	},
	createMenu:function(){
		createMenuCollection = new DishMenuCollection;
		createMenuView = new CreateMenuView({collection:createMenuCollection});
		$("#main").html(createMenuView.el);
	},
	loadDeposit:function(){
		depositCollection = new DepositCollection;
		depositView = new DepositView({collection:depositCollection});
		depositCollection.fetch();
		$("#main").html(depositView.el);
	},
	loadRegisterMeal: function(){
		registerMealCollection = new RegisterMealCollection();
		registerMealView = new RegisterMealView({collection: registerMealCollection});
		registerMealCollection.fetch();
		$("#main").html(registerMealView.el);
	}
})

$(function() {
	var appRouter = new AppRouter();	
	Backbone.history.start();
});
