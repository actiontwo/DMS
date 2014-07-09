//Declare Model
var RegisterMealModel = Backbone.Model.extend({
  urlRoot: "/registermealAd"
});
//Declare Collection
var RegisterMealCollection = Backbone.Collection.extend({
  url: "/registermealAd",
  model: RegisterMealModel
});
// Register Meal By Day
var RMByDayModel = Backbone.Model.extend({
  urlRoot: "/registermealByDay"
});
var RMByDayCollection = Backbone.Collection.extend({
  url: "/registermealByDay",
  model: RMByDayModel
});
// Register Meal By account
var RMByUserModel = Backbone.Model.extend({
  urlRoot: "/registermealByUser"
});
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
    //inint animation and count regiters meal
    initDatePicker($('.datepicker'));

    this.collection.each(function(model){
      var name = model.attributes.name;
      var option = '<option value="'+name+'">'+name+'</option>';
      $('#selectUser').append(option);
    });

    this.delegateEvents({
      'click #btnAdminViewByDay': 'viewByDay',
      'click #btnAdminViewByUser': 'viewByUser'
    });

    this.updateTotalRow();

    return this;
  },
  viewByDay: function()
  {
    var $this = this; 
    var _selectedDay = $('.admin-find-day').find('input').val();

    var rmByDayCollection = new RMByDayCollection();

    $.post('/registermealByDay', {selectedDay: _selectedDay}, function(data){
      rmByDayCollection.reset(data);
      //re-render
      $this.$el.html(Templates['admin/admin/registerMealManager'](rmByDayCollection));
      //inint animation and count regiters meal
      initDatePicker($('.datepicker'));
      $this.collection.each(function(model){
        var name = model.attributes.name;
        var option = '<option value="'+name+'">'+name+'</option>';
        $('#selectUser').append(option);
      });
      $this.delegateEvents({
        'click #btnAdminViewByDay': 'viewByDay',
        'click #btnAdminViewByUser': 'viewByUser'
      });
      $('.admin-find-day .datepicker').val(_selectedDay);
      $('#selectUser').val("");
      $this.updateTotalRow();
    });
    
  },
  viewByUser: function()
  {
    var $this = this; 
    var _selectedUser = $('#selectUser').val();

    var rmByUserCollection = new RMByUserCollection();

    $.post('/registermealByUser', {selectedUser: _selectedUser}, function(data){
      rmByUserCollection.reset(data);
      //re-render
      $this.$el.html(Templates['admin/admin/registerMealManager'](rmByUserCollection));
      //inint animation and count regiters meal
      initDatePicker($('.datepicker'));
      $this.collection.each(function(model){
        var name = model.attributes.name;
        var option = '<option value="'+name+'">'+name+'</option>';
        $('#selectUser').append(option);
      });
      $this.delegateEvents({
        'click #btnAdminViewByDay': 'viewByDay',
        'click #btnAdminViewByUser': 'viewByUser'
      });
      $('.admin-find-day .datepicker').val("");
      $('#selectUser').val(_selectedUser);
      $this.updateTotalRow();
    });
    
  },
  updateTotalRow: function()
  {
    $('.mealsChecked').html($('.mealCheckbox:checked').length);
    var totalMeals = 0;
    $('.numberOfMeals').each(function(){
      totalMeals+= parseInt($(this).html());
    });
    $('.totalMeals').html(totalMeals);
  }
});