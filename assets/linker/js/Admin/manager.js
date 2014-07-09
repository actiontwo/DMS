
var ManagerView = Backbone.View.extend({
  tagName: 'div',
  id: 'manager_view',
  className: 'menus',
  render: function () {
    this.$el.html(Templates['Admin/Admin/Admin-Admin']());
    $("#tabsAdmin").tabs();
    return this;
  }
});