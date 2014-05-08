var AppRouter = Backbone.Router.extend({
	routes: {
		dish_menu: 'loadDishMenu'
	},
	loadDishMenu: function() {
		dishMenuCollection = new DishMenuCollection;
		dishMenuView = new DishMenuView({collection: dishMenuCollection});
		dishMenuCollection.fetch();
		$("#main").html(dishMenuView.el);
	}
})

$(function() {
	var appRouter = new AppRouter();	
	Backbone.history.start();
});
