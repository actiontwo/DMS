var MealHistoryModel = Backbone.Model.extend({
  urlRoot: '/mealhistoryadmin'
});
var MealHistoryCollection = Backbone.Collection.extend({
  url: '/mealhistoryadmin',
  model: MealHistoryModel
});
var MealHistoryView = Backbone.View.extend({
  collection: new MealHistoryCollection(),
  model: new MealHistoryModel(),
  tagName: 'div',
  id: 'manager_mealhistory',
  className: 'menus',
  initialize: function() {
    this.listenTo(this.collection, 'reset change add remove', this.render);
  },
  render: function() {
    this.$el.html(Templates['admin/mealhistory/meal-history'](this.collection));
    initDatePicker($('.datepicker'));
    var arrayName =[];
    this.collection.each(function(model) {
      var name = model.attributes.name;
      if (arrayName.indexOf(name) ==-1) {
        var option = '<option value="' + name + '">' + name + '</option>';
        $('#selectname').append(option);
      }
      arrayName.push(name);
    });
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
    $('.totalmeal').html(this.total($('.meal')));
    $('.totalcost').html(this.total($('.cost')));
    return this;
  },
  searchByDay: function() {
    var collection = new MealHistoryCollection();
    var viewbyday = $('.viewbyday').val();
    this.collection.each(function(model) {
      if (model.attributes.date == viewbyday) collection.add(model)
    });
    this.$el.html(Templates['admin/mealhistory/meal-history'](collection));
    initDatePicker($('.datepicker'));
    var arrayName =[];
    this.collection.each(function(model) {
      var name = model.attributes.name;
      if (arrayName.indexOf(name) ==-1) {
        var option = '<option value="' + name + '">' + name + '</option>';
        $('#selectname').append(option);
      }
      arrayName.push(name);
    });
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
    $('.totalmeal').html(this.total($('.meal')));
    $('.totalcost').html(this.total($('.cost')));
  },
  searchByUser: function() {
    var collection = new MealHistoryCollection();
    var viewbyname = $('#selectname').val();
    this.collection.each(function(model) {
      if (model.attributes.name == viewbyname) collection.add(model);
    });
    this.$el.html(Templates['admin/mealhistory/meal-history'](collection));
    initDatePicker($('.datepicker'));
    var arrayName =[];
    this.collection.each(function(model) {
      var name = model.attributes.name;
      if (arrayName.indexOf(name) ==-1) {
        var option = '<option value="' + name + '">' + name + '</option>';
        $('#selectname').append(option);
      }
      arrayName.push(name);
    });
    this.delegateEvents({
      'click .searchbyday': 'searchByDay',
      'click .searchbyuser': 'searchByUser'
    });
    $('.totalmeal').html(this.total($('.meal')));
    $('.totalcost').html(this.total($('.cost')));
  },
  total: function(el) {
    var total = 0;
    el.each(function() {
      if ($.isNumeric(parseInt($(this).html()))) {
        total += parseInt($(this).html());
      }
    });
    return total;
  }
});