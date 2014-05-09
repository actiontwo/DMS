var AppRouter = Backbone.Router.extend({
	routes: {
		dish_menu: 'loadDishMenu'
	},
	loadDishMenu: function() {
		dishMenuCollection = new DishMenuCollection;
		dishMenuView = new DishMenuView({collection: dishMenuCollection});
		dishMenuCollection.fetch({data:$.param({page:0,number:5})});
		$("#main").html(dishMenuView.el);
	}
})

$(function() {
	var appRouter = new AppRouter();	
	Backbone.history.start();
});
