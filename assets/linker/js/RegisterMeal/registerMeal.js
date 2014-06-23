//Declare Model
var RegisterMealModel = Backbone.Model.extend({
  urlRoot: "/registermeal"
});
//Declare Collection
var RegisterMealCollection = Backbone.Collection.extend({
  url: "/registermeal",
  model: RegisterMealModel,
  comparator: 'date'
});
//Declare View
var RegisterMealView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'register_meal',
  initialize: function () {
    this.listenTo(this.collection, 'reset sort change', this.render);
  },
  render: function () {
    this.$el.html(Templates['user/mem-register-meal'](this.collection));
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox, .numberOfMeals': 'changeStatus'
    });

    initDatePicker($('.datepicker'));
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);
    var date = ev.data('date');
    var status = ev.parents('tr').find('.lunchCheckbox').prop('checked');
    var numberOfmeal = ev.parents('tr').find('.numberOfMeals').val();
    var data = {
      status: status,
      numberOfMeals: (status)
        ? numberOfmeal
        : 0
    };
    this.collection.findWhere({date: date}).set(data);
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
  },
  updateData: function () {
    for (i = 0; i < this.collection.length; i++) {
      var model = this.collection.models[i];
      if (model.hasChanged()) {
        model.save();
        model.changed = false;
      }
    }
  },
  countNumberOfMeals: function (el) {
    var total = 0;
    el.each(function () {
      console.log($(this).val());
      total += parseInt($(this).val());
    });
    return total;
  }
});