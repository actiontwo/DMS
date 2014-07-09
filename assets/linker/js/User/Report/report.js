var ReportModel = Backbone.Model.extend({});

var ReportCollection = Backbone.Collection.extend({
  url: "/menu",
  model: ReportModel
});

var ReportView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'report_menu',
  initialize: function(options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);
  },
  render:function (){
    this.$el.html(Templates['User/mem-view-report']());
    return this;
  }
});
