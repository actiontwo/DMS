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

    var numOfMeals = 0;
    $('.numOfMeals').each(function(){
      numOfMeals += parseInt($(this).find('input').val());
    });
    $('.TotalMeals').html(numOfMeals);

    //declare events for views
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox': 'changeStatus',
      'change #checkOrUncheckAll': 'checkOrUncheckAll',
      'focusout .inputNumOfMeals': 'numOfMealsChanged',
      'click #btnViewByDay': 'viewByDay',
      'focusin .inputNumOfMeals': 'updateMealsPreValue',
      'mousedown .lunchCheckbox': 'updateCheckboxPreValue'
    });
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);

    if (ev.prop('checked')==false)
      ev.parent().parent().find('.inputNumOfMeals').val(0);
    else ev.parent().parent().find('.inputNumOfMeals').val(1);

    if (ev.prop('checked')!=ev.data('preValue')) ev.toggleClass('changeStatus');

    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);

    var numOfMeals = 0;
    $('.numOfMeals').each(function(){
      numOfMeals += parseInt($(this).find('input').val());
    });
    $('.TotalMeals').html(numOfMeals);
  },
  // when user check
  updateData: function (el) {
    var thisCollection = this.collection;

    var data = {
      mealStatus: []
    };
    var dateNew, mealNew, statusNew, numOfMealsNew;
    $('.changeStatus, .changeMeals').each(function () {
      if ($(this).hasClass('changeStatus'))
      {
        dateNew = $(this).data('date');
        mealNew = $(this).data('meal');
        statusNew = $(this).prop('checked');
        numOfMealsNew = $(this).parent().parent().find('.inputNumOfMeals').val();

        data.mealStatus.push({
          date: dateNew,
          meal: mealNew,
          status: statusNew,
          numOfMeals: numOfMealsNew
        });
      }
      else
      {
        dateNew = $(this).parent().parent().find('.lunchCheckbox').data('date');
        mealNew = $(this).parent().parent().find('.lunchCheckbox').data('meal');
        statusNew = $(this).parent().parent().find('.lunchCheckbox').prop('checked');
        numOfMealsNew = $(this).val();
        data.mealStatus.push({
          date: dateNew,
          meal: mealNew,
          status: statusNew,
          numOfMeals: numOfMealsNew
        })
      }

      // thisCollection.each(function(model){
      //   if(model.attributes.date = dateNew)
      //   {
      //     model.set({
      //       date: dateNew,
      //       meal: mealNew,
      //       status: statusNew,
      //       numOfMeals: numOfMealsNew
      //     })
      //     model.save(this.model.attributes);
      //   }
      // })

    }).removeClass('changeStatus').removeClass('changeMeals');

    this.model.save(data, {
      success: function (model, response) {
        console.log(model);
        console.log(response);
      },
      error: function (model, error) {
        console.log(model.toJSON());
        console.log(error);
    }});
  },
  checkOrUncheckAll: function(el){
    var ev = $(el.currentTarget);

    var currentTime = new Date();
    var today = new Date(currentTime.getMonth()+1+'/'+currentTime.getDate()+'/'+currentTime.getFullYear());
    console.log('CURRENT DAY:' + today.toString());
    var thisDateText;
    var thisDateObject;

    if (ev.prop('checked')==true)
    {
      $('.lunchCheckbox').each(function(){
      thisDateText = $(this).data('date');
      thisDateObject = new Date(thisDateText);
      thisOldCheckState = $(this).prop('checked');
      if (thisDateObject >= today){
          if (thisOldCheckState != true) $(this).toggleClass('changeStatus');
          $(this).prop('checked', true);
          $(this).parent().parent().find('.inputNumOfMeals').val(1);
          $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
        } 
      });
    }
    else
    {
      $('.lunchCheckbox').each(function(){
        thisDateText = $(this).data('date');
        thisDateObject = new Date(thisDateText);
        thisOldCheckState = $(this).prop('checked');
        if (thisDateObject >= today){
          if (thisOldCheckState != false) $(this).toggleClass('changeStatus');
          $(this).prop('checked',false);
          $(this).parent().parent().find('.inputNumOfMeals').val(0);
          $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
        }
      });
    }

    var numOfMeals = 0;
    $('.numOfMeals').each(function(){
      numOfMeals += parseInt($(this).html().trim());
    });
    $('.TotalMeals').html(numOfMeals);
  },
  numOfMealsChanged: function(el)
  {
    var ev = $(el.currentTarget);
    if(ev.val() != ev.data('preValue'))
      ev.toggleClass('changeMeals');
  },
  viewByDay: function()
  {
    var thisCollection = this.collection;
    var dayFrom = new Date($('.find-from-user').find('input').val());
    //console.log(dayFrom);
    var dayTo = new Date($('.find-to-user').find('input').val());
    //console.log(dayTo);
    var tempCollection = new RegisterMealCollection();
    thisCollection.each(function(model){
      var thisModelDate = new Date(model.attributes.date);
      if(thisModelDate>=dayFrom && thisModelDate<=dayTo) tempCollection.add(model);
    });

    tempCollection.each(function(model){
      console.log(model.attributes.date);
    });

    //re-render
    this.$el.html(Templates['user/mem-register-meal'](tempCollection));

    //inint animation and count regiters meal
    initDatePicker($('.datepicker'));

    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);

    var numOfMeals = 0;
    $('.numOfMeals').each(function(){
      numOfMeals += parseInt($(this).find('input').val());
    });
    $('.TotalMeals').html(numOfMeals);

    //declare events for views
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox, .dinnerCheckbox': 'changeStatus',
      'change #checkOrUncheckAll': 'checkOrUncheckAll',
      'focusout .inputNumOfMeals': 'numOfMealsChanged',
      'click #btnViewByDay': 'viewByDay'
    });
  },
  updatePreValue: function(el){
    var ev = $(el.currentTarget);
    ev.data('preValue', ev.val());
    console.log(ev.data('preValue'));
  },
  updateCheckboxPreValue: function(el){
    var ev = $(el.currentTarget);
    ev.data('preValue', ev.prop('checked'));
    console.log("Previous Checkbox Value: " + ev.data('preValue'));
  }
});