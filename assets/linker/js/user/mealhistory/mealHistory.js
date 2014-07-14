var MealHistoryModel = Backbone.Model.extend({
  urlRoot: "/mealhistory"
});

var MealHistoryCollection = Backbone.Collection.extend({
  url: "/mealhistory",
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
    this.$el.html(Templates['user/mealhistory/meal-history'](this.collection));
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .searchbyday': 'searchByDay'
    });
    return this;
  },
  searchByDay: function() {
    var collection = new MealHistoryCollection();
    var viewbyday = $('.viewbyday').val();
    if(viewbyday.length==0){
      $('#datepicker-empty-error').fadeIn().delay(2500).fadeOut();
      return;
    }
    this.collection.each(function(model) {
      if (model.attributes.date == viewbyday) collection.add(model)
    });
    this.$el.html(Templates['user/mealhistory/meal-history'](collection));
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .searchbyday': 'searchByDay'
    });
  }
});
