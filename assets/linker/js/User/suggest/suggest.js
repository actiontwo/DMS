var SugestModel = Backbone.Model.extend({
  urlRoot: '/Suggest'
});
var SuggestCollection = Backbone.Collection.extend({
  url: '/Suggest',
  model: SugestModel
});
var SuggestView = Backbone.View.extend({
  tagName: 'div', 
  className: 'menus',
  id: 'dish_menu',
  initialize: function(){
    this.listenTo(this.collection, 'reset destroy change add', this.render);
  },
  render: function(){
    this.$el.html(Templates['User/suggest/listSuggest'](
      this.collection
    ));
    return this;
  }
});