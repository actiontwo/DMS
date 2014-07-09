var ConfigModel = Backbone.Model.extend({
  urlRoot: '/managerParam'
});

var ConfigView = Backbone.View.extend({
  model: new ConfigModel(),
  tagName: 'div',
  id: 'manager_options',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.model, 'change reset', this.render);
  },
  render: function () {
    this.$el.html(Templates['Admin/Config/config'](this.model.attributes));
    this.delegateEvents({
      'click .btn-manager': 'send'
    });
    return this;
  },
  send: function () {
    var _costPerMeal = $('.manager_form .cost').val();
    var _lastHour = $('.manager_form .hour').val();
    var data = {
      name: 'manager',
      costPerMeal: _costPerMeal,
      lastHour: _lastHour
    };
    this.model.save(data);
  }
});