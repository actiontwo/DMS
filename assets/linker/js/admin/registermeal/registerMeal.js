//Declare Model
var RegisterMealModel = Backbone.Model.extend({
  urlRoot: "/registermealAd"
});
//Declare Collection
var RegisterMealCollection = Backbone.Collection.extend({
  url: "/registermealAd",
  model: RegisterMealModel
});
// Declare Register Meal By Day Model
var RMByDayModel = Backbone.Model.extend({
  urlRoot: "/registermealByDay"
});
// Declare Register Meal By Day Collection
var RMByDayCollection = Backbone.Collection.extend({
  url: "/registermealByDay",
  model: RMByDayModel
});
// Declare Register Meal By User Model
var RMByUserModel = Backbone.Model.extend({
  urlRoot: "/registermealByUser"
});
// Declare Register Meal By User Collection
var RMByUserCollection = Backbone.Collection.extend({
  url: "/registermealByUser",
  model: RMByUserModel
});
//Declare View
var RegisterMealView = Backbone.View.extend({
  model: new RegisterMealModel(),
  collection: new RegisterMealCollection(),
  tagName: 'div',
  className: 'menus',
  id: 'RegisterMeal_Manager',
  initialize: function () {
    this.listenTo(this.collection, 'reset sort', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/registermeal/registerMeal'](this.collection));
    //initialize datepicker
    initDatePicker($('.datepicker'));
    //add usernames to the option box
    this.collection.each(function(model){
      // for only users that has already actived their accounts
      var name = model.attributes.name;
      var option = '<option value="'+name+'">'+name+'</option>';
      $('#selectUser').append(option);
    });
    this.delegateEvents({
      'click #btnAdminViewByDay': 'viewByDay',
      'click #btnAdminViewByUser': 'viewByUser'
    });
    //calculate the mealsChecked, numberOfMeals & totalMeals values
    this.updateTotalRow();
    return this;
  },
  viewByDay: function()
  {
    // this function is called when admin search the meal registrations by a specific day
    // set this to $this variable, use when we change scope later
    var $this = this;
    // get the selectedDay
    var _selectedDay = $('.admin-find-day').find('input').val();
    var rmByDayCollection = new RMByDayCollection();
    // send a post request contains selectedDay information to the server
    $.post('/registermealByDay', {selectedDay: _selectedDay}, function(data){
      rmByDayCollection.reset(data);
      //re-render
      $this.$el.html(Templates['admin/registermeal/registerMeal'](rmByDayCollection));
      //initialize datepicker
      initDatePicker($('.datepicker'));
      //add usernames to the option box
      this.collection.each(function(model){
        // for only users that has already actived their accounts
        var name = model.attributes.name;
        var option = '<option value="'+name+'">'+name+'</option>';
        $('#selectUser').append(option);
      });
      this.delegateEvents({
        'click #btnAdminViewByDay': 'viewByDay',
        'click #btnAdminViewByUser': 'viewByUser'
      });
      // update the datepicker's content = _seletedDay
      $('.admin-find-day .datepicker').val(_selectedDay);
      $('#selectUser').val('');
      $this.updateTotalRow();
    });

  },
  viewByUser: function()
  {
    // this function is called when admin search the meal registrations by a specific user
    // set this to $this variable, use when we change scope later
    var $this = this;
    // get the selected User
    var _selectedUser = $('#selectUser').val();
    var rmByUserCollection = new RMByUserCollection();
    // send a post request contains selectedUser information to the server
    $.post('/registermealByUser', {selectedUser: _selectedUser}, function(data){
      rmByUserCollection.reset(data);
      //re-render
      $this.$el.html(Templates['admin/registermeal/registerMeal'](rmByUserCollection));
      //initialize datepicker
      initDatePicker($('.datepicker'));
      //add usernames to the option box
      this.collection.each(function(model){
        // for only users that has already actived their accounts
        var name = model.attributes.name;
        var option = '<option value="'+name+'">'+name+'</option>';
        $('#selectUser').append(option);
      });
      this.delegateEvents({
        'click #btnAdminViewByDay': 'viewByDay',
        'click #btnAdminViewByUser': 'viewByUser'
      });
      $('.admin-find-day .datepicker').val('');
      // set current value of #selectUser option box to _selectedUser
      $('#selectUser').val(_selectedUser);
      $this.updateTotalRow();
    });
  },
  updateTotalRow: function()
  {
    // this function re-calculates values of number of meals checked, total number of meals
    $('.mealsChecked').html($('.mealCheckbox:checked').length);
    var totalMeals = 0;
    $('.numberOfMeals').each(function(){
      totalMeals+= parseInt($(this).html());
    });
    $('.totalMeals').html(totalMeals);
  }
});