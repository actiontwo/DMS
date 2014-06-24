var MealHistoryModel = Backbone.Model.extend({
  urlRoot: "/mealHistory"
});

var MealHistoryCollection = Backbone.Collection.extend({
  url: "/mealHistory",
  model: MealHistoryModel
});

var MealHistoryView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'register_meal',
  initialize: function () {
    this.listenTo(this.collection, 'reset sort change', this.render);
  },
  render:function (){
    this.$el.html(Templates['mealHistory/mealHistory'](this.collection));
    return this;
  }
});