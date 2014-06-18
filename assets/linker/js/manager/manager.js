
var ManagerView = Backbone.View.extend({
  tagName: 'div',
  id: 'manager_view',
  className: 'menus',
  render: function () {
    this.$el.html(Templates['admin/Manager/admin-manager']());
    $("#tabsAdmin").tabs();
    return this;
  }
});