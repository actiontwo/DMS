//Declare Model
var RegisterMealAdModel = Backbone.Model.extend({
  urlRoot: "/registermealAd"
});
//Declare Collection
var RegisterMealAdCollection = Backbone.Collection.extend({
  url: "/registermealAd",
  model: RegisterMealAdModel
});
//Declare View
var RegisterMealAdView = Backbone.View.extend({

  tagName: 'div',
  className: 'menus',
  id: 'register_meal_ad',
  initialize: function () {
    this.listenTo(this.collection, 'reset sort', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/admin-register-meal'](this.collection));
    //inint animation and count regiters meal
    initDatePicker($('.datepicker'));
    return this;
  }
});