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

    this.updateTotalRow();

    //declare events for views
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox': 'changeStatus',
      'change #checkOrUncheckAll': 'checkOrUncheckAll',
      'click #btnViewByDay': 'viewByDay',
      'mousedown .lunchCheckbox': 'updateCheckboxPreValue',
      'click .edit': 'editMeal',
      'click .save': 'saveMeal',
      'change .inputNumberOfMeals': 'numberOfMealsChanged'
    });
    return this;
  },
  changeStatus: function (el) {
    var ev = $(el.currentTarget);

    if (ev.prop('checked')==false)
      ev.parent().parent().find('.numberOfMeals').html(0);
    else ev.parent().parent().find('.numberOfMeals').html(1);

    if (ev.prop('checked')!=ev.data('preValue')) ev.addClass('changeStatus');
    this.updateTotalRow();
  },
  // when user check
  updateData: function (el) {
    var thisCollection = this.collection;

    var data = {
      mealStatus: []
    };
    var dateNew, mealNew, statusNew, numberOfMealsNew;
    $('.changeStatus, .changeMeals').each(function () {
      if ($(this).hasClass('changeStatus'))
      {
        dateNew = $(this).data('date');
        mealNew = $(this).data('meal');
        statusNew = $(this).prop('checked');
        numberOfMealsNew = parseInt($(this).parent().parent().find('.numberOfMeals').html());

        data.mealStatus.push({
          date: dateNew,
          meal: mealNew,
          status: statusNew,
          numberOfMeals: numberOfMealsNew
        });
      }
      else
      {
        dateNew = $(this).parent().parent().find('.lunchCheckbox').data('date');
        mealNew = $(this).parent().parent().find('.lunchCheckbox').data('meal');
        statusNew = $(this).parent().parent().find('.lunchCheckbox').prop('checked');
        numberOfMealsNew = parseInt($(this).html().trim());
        data.mealStatus.push({
          date: dateNew,
          meal: mealNew,
          status: statusNew,
          numberOfMeals: numberOfMealsNew
        })
      }
    }).removeClass('changeStatus').removeClass('changeMeals');

    this.model.save(data, {
      success: function (model, response) {
        console.log('success saving data');
        console.log(model);
        console.log(response);
      },
      error: function (model, error) {
        console.log('error saving data');
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
          if (thisOldCheckState != true) $(this).addClass('changeStatus');
          $(this).prop('checked', true);
          $(this).parent().parent().find('.numberOfMeals').html(1);
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
          if (thisOldCheckState != false) $(this).addClass('changeStatus');
          $(this).prop('checked',false);
          $(this).parent().parent().find('.numberOfMeals').html(0);
        }
      });
    }

    this.updateTotalRow();
  },
  viewByDay: function()
  {
    var thisCollection = this.collection;
    var dayFrom = new Date($('#find-from-user').val());
    //console.log(dayFrom);
    var dayTo = new Date($('#find-to-user').val());
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

    this.updateTotalRow();

    //declare events for views
    this.delegateEvents({
      'click #saveRegister': 'updateData',
      'change .lunchCheckbox': 'changeStatus',
      'change #checkOrUncheckAll': 'checkOrUncheckAll',
      'click #btnViewByDay': 'viewByDay',
      'mousedown .lunchCheckbox': 'updateCheckboxPreValue'
    });
  },
  updateCheckboxPreValue: function(el){
    var ev = $(el.currentTarget);
    ev.data('preValue', ev.prop('checked'));
    //console.log("Previous Checkbox Value: " + ev.data('preValue'));
  },
  editMeal: function(el){
    var ev = $(el.currentTarget);
    var $numberOfMeals = ev.parent().parent().find('.numberOfMeals');
    var numberOfMeals = parseInt($numberOfMeals.html().trim());
    $numberOfMeals.data('preValue', numberOfMeals);
    ev.removeClass('glyphicon-pencil').addClass('glyphicon-floppy-disk');
    ev.removeClass('edit').addClass('save');
    $numberOfMeals.html('<input type="number" class="inputNumberOfMeals" min="0" value="'+numberOfMeals+'">');
  },
  updateTotalRow: function()
  {
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    var numberOfMeals = 0;
    $('.numberOfMeals').each(function(){
      if($(this).html().trim()) numberOfMeals += parseInt($(this).html().trim());
    });
    $('.TotalMeals').html(numberOfMeals);
  },
  saveMeal: function(el){
    var ev = $(el.currentTarget);
    var $numberOfMeals = ev.parent().parent().find('.numberOfMeals');
    var newNumberOfMeals = $numberOfMeals.find('input').val();
    var oldNumberOfMeals = $numberOfMeals.data('preValue');

    $numberOfMeals.html(newNumberOfMeals);
    if(oldNumberOfMeals!=newNumberOfMeals) $numberOfMeals.addClass('changeMeals');

    ev.removeClass('glyphicon-floppy-disk').addClass('glyphicon-pencil');
    ev.removeClass('save').addClass('edit');

    this.updateTotalRow();
  },
  numberOfMealsChanged: function(el){
    var ev = $(el.currentTarget);
    if(ev.val() <= 0) ev.parent().parent().parent().find('.lunchCheckbox').prop('checked', false);
    else ev.parent().parent().parent().find('.lunchCheckbox').prop('checked', true);
    // update Total row
    $('.numberLunchCheck').html($('.lunchCheckbox:checked').length);
    var numberOfMeals = parseInt(ev.val());
    $('.numberOfMeals').each(function(){
      if($(this).find('.inputNumberOfMeals').length != 0) console.log('hehe');
      else
      {
        if($(this).html().trim()) numberOfMeals += parseInt($(this).html().trim()); 
      }
    });
    $('.TotalMeals').html(numberOfMeals);
  }
});