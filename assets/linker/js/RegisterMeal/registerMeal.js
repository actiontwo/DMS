//Declare Model
var RegisterMealModel = Backbone.Model.extend({
  urlRoot: "/registermeal"
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
    this.listenTo(this.collection, 'reset sort', this.render);
  },
  render: function () {
    this.$el.html(Templates['user/mem-register-meal'](this.collection));

    //inint animation and count regiters meal
    initDatePicker($('.datepicker'));
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.numberDinnerCheck').html($('.dinnerCheckbox:checked').length);

    //declare events for views
    this.delegateEvents({
      'change .lunchCheckbox,.dinnerCheckbox': 'updateStatus'
    });
    return this;
  },
  // when user check
  updateStatus: function (el) {
    var ev = $(el.currentTarget);
    var data = {
      date: ev.parents('.dateRegister').find('.date').data('date'),
      status: ev.prop('checked'),
      meal: ev.data('meal')
    };
    var model = this.collection.add(data);
    model.save();
    this.collection.remove(model);
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.numberDinnerCheck').html($('.dinnerCheckbox:checked').length);
  }
});