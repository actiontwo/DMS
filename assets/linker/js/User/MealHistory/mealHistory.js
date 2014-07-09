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
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .searchbyday': 'searchByDay'
    });
    return this;
  },
  searchByDay: function() {
    var collection = new MealHistoryCollection();
    var viewbyday = $('.viewbyday').val();
    this.collection.each(function(model) {
      if (model.attributes.date == viewbyday) collection.add(model)
    });
    this.$el.html(Templates['mealHistory/mealHistory'](collection));
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .searchbyday': 'searchByDay'
    });
  }
});
