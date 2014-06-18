var UserManagerModel = Backbone.Model.extend({
  urlRoot: '/user',
});
var UserManagerCollection = Backbone.Collection.extend({
  url: '/user',
  model: UserManagerModel
});
Handlebars.registerHelper('role', function (role) {
  return (role == 'admin')
    ? 'selected'
    : '';
});
var UserManagerView = Backbone.View.extend({
  collection: new UserManagerCollection(),
  model: new UserManagerModel(),
  tagName: 'div',
  id: 'User_Manager',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.collection, 'reset change', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/userManager'](this.collection));
    return this;
  },
  events: {
    'change .userActiveField': 'updateStatus',
    'click #saveUser': 'saveUser',
    'change .userRoleField': 'updateRole'
  },
  updateRole: function (el) {
    var ev = $(el.currentTarget);
    var role = 'user';
    if (ev.val() == 'admin') {
      role = 'admin';
    }
    this.collection.get(ev.parents('tr').data('id')).set({role: role});
  },
  updateStatus: function (el) {
    var ev = $(el.currentTarget);
    this.collection.get(ev.parents('tr').data('id')).set({active: ev.prop('checked')});
  },
  saveUser: function () {
    for (i = 0; i < this.collection.length; i++) {
      var model = this.collection.models[i];
      if (model.hasChanged()) {
        model.save();
      }
    }
  }
});