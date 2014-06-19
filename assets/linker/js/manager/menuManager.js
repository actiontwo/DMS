//Declare Model
var MenuManagerModel = Backbone.Model.extend({
  urlRoot: "/menuAd"
});
//Declare Collection
var MenuManagerCollection = Backbone.Collection.extend({
  url: "/menuAd",
  model: MenuManagerModel
});
var MenuManagerView = Backbone.View.extend({
  model: new MenuManagerModel,
  collection: new MenuManagerCollection,
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function(){
    this.listenTo(this.collection, 'reset change', this.render);
  },
  render: function(){
    this.$el.html(Templates['admin/Manager/menuManager'](this.collection));
    initDatePicker($('.datepicker'));
    return this;
  },
  events: {
    'click .saveDish': 'saveDish'
  },
  saveDish: function(){
    var dish = $('.dishname').val();
    var note = $('.dishnote').val();
    console.log(dish);
    var data = {
      dish: dish,
      note: note
    };
    console.log(data);
    this.model.urlRoot = '/dish';
    this.model.save(data, {
      success: function(model, res){
        console.log(res);
      },
      error: function(model, err){
        console.log(err);
      }
    });
    this.model.urlRoot = '/menuAd';
    $('.dishname').val('');
    $('.dishnote').val('')
  }
})