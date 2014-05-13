var DishMenuCollection = Backbone.Collection.extend({
	url: "/menu",
	model: DishMenuModel
})