var DishListCollection = Backbone.Collection.extend({
	url:'/listdish',
	model: DishListModel
})