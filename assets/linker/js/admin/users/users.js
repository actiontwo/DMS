var UsersModel = Backbone.Model.extend({
  urlRoot: '/user'
});
var UsersCollection = Backbone.Collection.extend({
  url: '/user',
  model: UsersModel
});

var UsersView = Backbone.View.extend({
  collection: new UsersCollection(),
  model: new UsersModel(),
  tagName: 'div',
  id: 'User_Manager',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.collection, 'reset change', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/users/users'](this.collection));
    this.delegateEvents({
      'change .userActiveField': 'updateStatus',
      'click #saveUser': 'saveUser',
      'change .userRoleField': 'updateRole',
      'click #checkAllUser': 'checkAllUser',
      'click #sendEmaiNotiBalance': 'sendMail'
    });
    return this;
  },
  sendMail: function () {
    var data = {content: $('#contentEmailNotification').val()};
    var listEmail = [];
    $('.checkUser').each(function () {
      if (!$(this).prop('checked')) {
        return;
      }
      listEmail.push($(this).parents('tr').find('.emailUser').html());
    });
    data.listEmail = listEmail;
    $.post('/mail', data,
      function (result) {
        $('.alert-sendEmail').show().find('.content-alert').html(result.data);
      }, 'json');
  },
  checkAllUser: function (el) {
    var ev = $(el.currentTarget);
    $('.checkUser').prop('checked', ev.prop('checked'));
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
    $('#save-users-success').fadeIn().delay(2000).fadeOut();
  }
});