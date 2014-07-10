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
// this will be the common collection for different situations
var currentRMCollection = new RegisterMealCollection();
//Declare View
var RegisterMealView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'register_meal',
  initialize: function () {
    currentRMCollection.fetch({reset: true});
    this.listenTo(currentRMCollection, 'reset sort change', this.render);
  },
  render: function () {
    var dayFromString = $('#find-from-user').val();
    var dayToString = $('#find-to-user').val();
    this.$el.html(Templates['user/mem-register-meal'](currentRMCollection));
    this.delegateEvents({
      'click #saveMealRegistrations': 'updateData',
      'change .lunchCheckbox, .numberOfMeals': 'changeStatus',
      'click #checkOrUncheckAll': 'checkOrUncheckAll',
      'click #btnViewByDay': 'viewByDay'
    });
    // initialize datepicker
    initDatePicker($('.datepicker'));
    // update number of checkboxes which are checked and total number of meals
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
    // update current days query for search area
    if (dayFromString!=="") $('#find-from-user').val(dayFromString);
    if (dayToString!=="") $('#find-to-user').val(dayToString);
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);
    var date = ev.data('date');
    var _status = ev.parents('tr').find('.lunchCheckbox').prop('checked');
    var _numberOfMeals = parseInt(ev.parents('tr').find('.numberOfMeals').val());
    var prevalue = ev.parents('tr').find('.numberOfMeals').data('prevalue');
    if(isNaN(_numberOfMeals))
    // if input for numberOfMeals is invalid
    {
      ev.parents('tr').find('.numberOfMeals').val(prevalue);
      alert('You must enter a number !');
      return;
    }
    else if(_numberOfMeals<0 || _numberOfMeals>10)
    //or if numberOfMeals is <0 or >10
    {
      ev.parents('tr').find('.numberOfMeals').val(prevalue);
      alert('The value for number of meal(s) is limited from 0 to 10.');
      return;
    }
    // assign new value for "data-prevalue" of numberOfMeals input
    ev.parents('tr').find('.numberOfMeals').data('prevalue', _numberOfMeals);

    //user only edited lunch checkbox value
    if (ev.hasClass('lunchCheckbox'))
    {
      if (_status){
        if (_numberOfMeals == 0) _numberOfMeals = 1;
      }
      else
        _numberOfMeals = 0;
    }
    else
    //user only edited input number of meals value
    {
      if (_numberOfMeals == 0) _status = false;
      else _status = true;
    }
    var data = {
      status: _status,
      numberOfMeals: _numberOfMeals
    };
    currentRMCollection.findWhere({date: date}).set(data);
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
  },
  updateData: function () {
    // hide the popup dialog
    $('.modal-backdrop').hide();
    $('body').removeClass('modal-open');
    // save all changed models to the database
    for (i = 0; i < currentRMCollection.length; i++) {
      var model = currentRMCollection.models[i];
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
  checkOrUncheckAll: function(el){
    var $this = this;
    var ev = $(el.currentTarget);
    if (ev.prop('checked')==true)
    // if 'checkAll', set all available checkboxes to 'checked'
    {
      $(".lunchCheckbox:not([disabled])").each(function(){
        $(this).prop('checked',true);
        $(this).parent().parent().find('.numberOfMeals').val(1);
      });
    }
    else
    // if 'UncheckAll', set all available checkboxes to 'Unchecked'
    {
      $(".lunchCheckbox:not([disabled])").each(function(){
        $(this).prop('checked',false);
        $(this).parent().parent().find('.numberOfMeals').val(0);
      });
    }
    currentRMCollection.each(function(model, data){
    // add all changes to collection - WE NEED TO FIX THIS
//    currentRMCollection.each(function(model, data){
//      if (!model.attributes.disabled) //console.log(model.attributes.date);
//      {
//        if (ev.prop('checked')==true)
//        {
//          model.set({status: true, numberOfMeals: 1});
//        }
//        else
//        {
//          model.set({status: false, numberOfMeals: 0});
//        }
//      }
//    });
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
  },
  viewByDay: function(el){
    var dayFromString = $('#find-from-user').val().toString().trim();
    var dayToString = $('#find-to-user').val().toString().trim();
    var $this = this;
    $.post('/registermeal/searchByDay',
      {
        "dayFrom": dayFromString,
        "dayTo": dayToString
      }, function(data){
        currentRMCollection.reset(data);
        //re-render
        $this.$el.html(Templates['user/mem-register-meal'](currentRMCollection));
        $this.delegateEvents({
          'click #saveMealRegistrations': 'updateData',
          'change .lunchCheckbox, .numberOfMeals': 'changeStatus',
          'click #checkOrUncheckAll': 'checkOrUncheckAll',
          'click #btnViewByDay': 'viewByDay'
        });
        // initialize datepicker
        initDatePicker($('.datepicker'));
        $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
        $('.TotalMeals').html($this.countNumberOfMeals($('.numberOfMeals')));
        // update information for the search query area
        $('#find-from-user').val(dayFromString);
        $('#find-to-user').val(dayToString);
      });
  }
});