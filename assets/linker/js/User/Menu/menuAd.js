//Declare Model
var MenuAdModel = Backbone.Model.extend({
  urlRoot: "/menuAd"
});
//Declare Collection
var MenuAdCollection = Backbone.Collection.extend({
  url: "/menuAd",
  model: MenuAdModel
});
var MenuAdView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function(){
    this.listenTo(this.collection, 'reset change', this.render);
  },
  render: function(){
    this.$el.html(Templates['Admin/Admin-menu'](this.collection));

    initDatePicker($('.datepicker'));
    return this;
  }
})