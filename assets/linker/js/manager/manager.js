var ManagerModel = Backbone.Model.extend({

});

var ManagerCollection = Backbone.Collection.extend({
  url: '/manager',
  model: ManagerModel
});

var ManagerView = Backbone.View.extend({
  tagName: 'div',
  id: 'manager_view',
  className: 'menus',
  initialize: function(){
    this.listenTo(this.collection, 'reset change sync remove', this.render);
  },
  render: function(){
    this.$el.html(Templates['user/manager']());
    return this;
  }
})
