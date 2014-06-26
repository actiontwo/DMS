var MealHistoryManagerModel = Backbone.Model.extend({
  urlRoot: '/mealhistoryadmin'
});
var MealHistoryManagerCollection = Backbone.Collection.extend({
  url: '/mealhistoryadmin',
  model: MealHistoryManagerModel
});
var MealHistoryManagerView = Backbone.View.extend({  
  collection: new MealHistoryManagerCollection(),
  model: new MealHistoryManagerModel(),
  tagName: 'div',
  id: 'manager_mealhistory',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.collection, 'reset change add remove', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/mealHistoryManager'](this.collection));   
    initDatePicker($('.datepicker'));
    this.collection.each(function(model){
      var name = model.attributes.name;     
      var option = '<option value="'+ name +'">' + name + '</option>';
      $('#selectname').append(option);
    })
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
    return this;
  },
  searchByDay: function(){
    var collection = new MealHistoryManagerCollection();
    var viewbyday = $('.viewbyday').val();
    this.collection.each(function(model){
      if(model.attributes.date == viewbyday) collection.add(model)
    });
    this.$el.html(Templates['admin/Manager/mealHistoryManager'](collection)); 
    initDatePicker($('.datepicker'));
    this.collection.each(function(model){
      var name = model.attributes.name;
      var option = '<option value="'+ name +'">' + name + '</option>';
      $('#selectname').append(option);
    })
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
  },
  searchByUser: function(){
    var collection = new MealHistoryManagerCollection();
    var viewbyname = $('#selectname').val();
    this.collection.each(function(model){
      if(model.attributes.name == viewbyname) collection.add(model);      
    })
    this.$el.html(Templates['admin/Manager/mealHistoryManager'](collection)); 
    initDatePicker($('.datepicker'));
    this.collection.each(function(model){
      var name = model.attributes.name;
      var option = '<option value="'+ name +'">' + name + '</option>';
      $('#selectname').append(option);
    })
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
  }
});