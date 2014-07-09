var UserModel = Backbone.Model.extend({
  urlRoot: '/userProfile'
});

var UserView = Backbone.View.extend({
  tagName: 'div',
  className: 'menus',
  id: 'report_menu',
  initialize: function (options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
    this.$el.html(Templates['User/mem-user-profile'](this.model.attributes));
    this.delegateEvents({
      'click .saveProfile': 'updateProfile',
      'click .edit': 'changeViewToEdit'
    });
    return this;
  },
  changeViewToEdit: function (el) {
    var ev = $(el.currentTarget);
    $('.content_info').removeClass('editing').attr('contenteditable', false);
    ev.parents('tr').find('.content_info').attr('contenteditable', true).addClass('editing');
  },
  updateProfile: function () {
    var checked = '';
    if ($('.defaultRegisterMeal').prop('checked')) {
      checked = 'checked';
    }
    var data = {
      defaultRegisterMeal: checked,
      firstname: $('.firstname').html(),
      lastname: $('.lastname').html()
    };
    if ($('input[name = "password"]').val() !== "") {
      if ($('input[name = "password"]').val() !== $('input[name = "confirmPassword"]').val()) {
        $('.alert').show();
        $('.error').html('Password not match');
        return;
      }
      data.password = $('input[name = "password"]').val();
    }
    this.model.set(data);
    this.model.save();
    delete this.model.attributes.password;
  }
});
