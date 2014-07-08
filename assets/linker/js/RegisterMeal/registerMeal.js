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
    this.$el.html(Templates['user/mem-register-meal'](currentRMCollection));
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox, .numberOfMeals': 'changeStatus',
      'click #checkOrUncheckAll': 'checkOrUncheckAll',
      'click #btnViewByDay': 'viewByDay'
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
    var _numberOfMeals = parseInt(ev.parents('tr').find('.numberOfMeals').val());
    var prevalue = ev.parents('tr').find('.numberOfMeals').data('prevalue');

    if(isNaN(_numberOfMeals))
    {
      ev.parents('tr').find('.numberOfMeals').val(prevalue);
      alert('You must enter a number !');
      return;
    }
    else if(_numberOfMeals<0 || _numberOfMeals>10)
    {
      ev.parents('tr').find('.numberOfMeals').val(prevalue);
      alert('The value for number of meal(s) is limited from 0 to 10.');
      return;
    }
    // assign new value of data-prevalue
    ev.parents('tr').find('.numberOfMeals').data('prevalue', _numberOfMeals);

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
    currentRMCollection.findWhere({date: date}).set(data);
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
  },
  updateData: function () {
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
    {
      $(".lunchCheckbox:not([disabled])").each(function(){
        $(this).prop('checked',true);
        $(this).parent().parent().find('.numberOfMeals').val(1);
      });
    }
    else
    {
      $(".lunchCheckbox:not([disabled])").each(function(){
        $(this).prop('checked',false);
        $(this).parent().parent().find('.numberOfMeals').val(0);
      });
    }

    $(".lunchCheckbox:not([disabled])").each(function(){
      var _date = $(this).data('date');
      var data = {
        status: $(this).prop('checked'),
        numberOfMeals: $(this).parent().parent().find('.numberOfMeals').val()
      };
      currentRMCollection.findWhere({date: _date}).set(data);
    });

    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    $('.TotalMeals').html(this.countNumberOfMeals($('.numberOfMeals')));
  },
  viewByDay: function(el){
    var dayFromString = $('#find-from-user').val().toString().trim();
    var dayToString = $('#find-to-user').val().toString().trim();
    //var searchByDayCollection = new RegisterMealCollection();
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
          'click #saveRegister': 'updateData',
          'change .lunchCheckbox, .numberOfMeals': 'changeStatus',
          'click #checkOrUncheckAll': 'checkOrUncheckAll',
          'click #btnViewByDay': 'viewByDay'
        });

        initDatePicker($('.datepicker'));
        $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
        $('.TotalMeals').html($this.countNumberOfMeals($('.numberOfMeals')));

        $('#find-from-user').val(dayFromString);
        $('#find-to-user').val(dayToString);

    });

  }
});