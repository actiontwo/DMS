var DishListCollection = Backbone.Collection.extend({
	url:'/dish',
	model: DishListModel
})