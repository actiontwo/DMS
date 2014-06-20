//Declare Model
var RegisterMealManagerModel = Backbone.Model.extend({
  urlRoot: "/registermealAd"
});
//Declare Collection
var RegisterMealManagerCollection = Backbone.Collection.extend({
  url: "/registermealAd",
  model: RegisterMealManagerModel
});
//Declare View
var RegisterMealManagerView = Backbone.View.extend({
  model: new RegisterMealManagerModel(),
  collection: new RegisterMealManagerCollection(),
  tagName: 'div',
  className: 'menus',
  id: 'RegisterMeal_Manager',
  initialize: function () {
    this.listenTo(this.collection, 'reset sort', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/registerMealManager'](this.collection));
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

    return this;
  },
  viewByDay: function()
  { 
    var thisCollection = this.collection;
    var tempCollection = new RegisterMealManagerCollection();
    var selectedDay = $('.admin-find-day').find('input').val();
    this.collection.each(function(model){
      if (model.attributes.date == selectedDay) tempCollection.add(model);
    });

    //re-render
    this.$el.html(Templates['admin/Manager/registerMealManager'](tempCollection));
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
    
  },
  viewByUser: function()
  {
    var thisCollection = this.collection;
    var tempCollection = new RegisterMealManagerCollection();
    var username = $('#selectUser').val();
    this.collection.each(function(model){
      if (model.attributes.name == username) tempCollection.add(model);
    });

    //re-render
    this.$el.html(Templates['admin/Manager/registerMealManager'](tempCollection));
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

    $('#selectUser').val(username);
  }

});