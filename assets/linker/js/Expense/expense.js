var ExpenseModel = Backbone.Model.extend({});

var ExpenseCollection = Backbone.Collection.extend({
  url: "/menu",
  model: ExpenseModel
});

var ExpenseView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'expense_menu',
  initialize: function(options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);
  },
  render:function (){
    this.$el.html(Templates['user/mem-expense']());
    return this;
  }
});
