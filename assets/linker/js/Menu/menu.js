var MenuModel = Backbone.Model.extend({});
var MenuCollection = Backbone.Collection.extend({
  url: "/menu",
  model: MenuModel
});
 
var MenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  subViews: {},
  initialize: function(options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);
  },
  render:function (){
    this.$el.html(Templates['user/mem-view-menu'](
      this.collection
    ));
    var i =1;
    $('tbody tr').find('td:first-child').each(function(){
      $(this).html(i);i++
    });
    initDatePicker($('.datepicker'));
    return this;
  }
  
});
