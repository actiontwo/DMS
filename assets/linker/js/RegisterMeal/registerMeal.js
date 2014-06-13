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
      'click #saveRegister': 'updateStatus',
      'change .lunchCheckbox, .dinnerCheckbox': 'changeStatus'
    });
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);
    ev.toggleClass('changeStatus');
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.numberDinnerCheck').html($('.dinnerCheckbox:checked').length);
  },
  // when user check
  updateStatus: function (el) {
    var data = {
      mealStatus: []
    };
    $('.changeStatus').each(function () {
      data.mealStatus.push({
        date: $(this).data('date'),
        meal: $(this).data('meal'),
        status: $(this).prop('checked')
      });
    }).removeClass('changeStatus');

    //var model = this.collection.add(data);
    this.model.save(data, {
      success: function (model, response) {
        console.log(model);
        console.log(response);
      },
      error: function (model, error) {
        console.log(model.toJSON());
        console.log(error);
      }});

  }
});