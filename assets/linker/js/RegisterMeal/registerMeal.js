//Declare Model
var RegisterMealModel = Backbone.Model.extend({
});
//Declare Collection
var RegisterMealCollection = Backbone.Collection.extend({
  url: "/registermeal",
  model: RegisterMealModel
});
//Declare View
var RegisterMealView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'register_meal',
  initialize: function () {
    this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
  },
  render:function (){
    this.$el.html(Templates['user/mem-register-meal']());

    return this;
  }
});