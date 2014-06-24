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
      'change .lunchCheckbox, .numberOfMeals': 'changeStatus',
      'click #checkOrUncheckAll': 'checkOrUncheckAll'
    });

    initDatePicker($('.datepicker'));
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);
    var date = ev.data('date');
    var _status = ev.parents('tr').find('.lunchCheckbox').prop('checked');
    var _numberOfMeals = ev.parents('tr').find('.numberOfMeals').val();
    //user just edited lunch checkbox value
    if (ev.hasClass('lunchCheckbox'))
    {
      if (_status){
        if (_numberOfMeals == 0) _numberOfMeals = 1;
      }
      else
        _numberOfMeals = 0;
    }
    else
      //user just edited input number of meals value
    {
      if (_numberOfMeals == 0) _status = false;
      else _status = true;
    }
    
    var data = {
      status: _status,
      numberOfMeals: _numberOfMeals
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
      total += parseInt($(this).val());
    });
    return total;
  },
  checkOrUncheckAll: function(){

    numberOfMeals.html('<input type="number" value="'+numberOfMeals.data('preValue')+'">'+'</input>');
  },
  saveMeal: function(el){
    var ev = $(el.currentTarget);
    var numberOfMeals = ev.parent().parent().find('.numberOfMeals');
    ev.toggleClass('glyphicon-pencil').removeClass('glyphicon-floppy-disk');
    ev.toggleClass('edit').removeClass('save');
    var currentValue = parseInt(ev.parent().parent().find('.numberOfMeals input').val());
    numberOfMeals.html(currentValue);
    if ( numberOfMeals.data('preValue') != currentValue)
    {
      numberOfMeals.addClass('changeMeals');
    }
  }
});