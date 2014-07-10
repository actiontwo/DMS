var SuggestModel = Backbone.Model.extend({
  urlRoot: '/suggest'
});
var SuggestCollection = Backbone.Collection.extend({
  url: '/suggest',
  model: SuggestModel
});
var SuggestView = Backbone.View.extend({
  tagName: 'div', 
  className: 'menus',
  id: 'dish_menu',
  initialize: function(){
    this.listenTo(this.collection, 'reset destroy change add', this.render);
  },
  render: function(){
    this.$el.html(Templates['user/suggest/listSuggest'](
      this.collection
    ));
    return this;
  }
});