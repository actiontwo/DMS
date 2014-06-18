var OptionsModel = Backbone.Model.extend({
  urlRoot: '/manager'
});

var OptionsView = Backbone.View.extend({
  model: new OptionsModel(),
  tagName: 'div',
  id: 'manager_options',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/options'](this.model.attributes));
    return this;
  },
  events: {
    'click .btn-manager': 'send'
  },
  send: function () {
    var cost = $('.manager_form .cost').val();
    var lastHour = $('.manager_form .hour').val();
    var data = {
      name: 'manager',
      costs: cost,
      lastHour: lastHour
    };
    this.model.set(data);
    this.model.save(data);
  }
});