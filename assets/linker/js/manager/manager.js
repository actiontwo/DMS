var ManagerModel = Backbone.Model.extend({
  urlRoot: '/manager'
});

var ManagerView = Backbone.View.extend({
  model: new ManagerModel(),
  tagName: 'div',
  id: 'manager_view',
  className: 'menus',
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },
  render: function(){
    this.$el.html(Templates['user/manager'](this.model.attributes));
    return this;
  },
  events: {
    'click .btn-manager': 'send'
  },
  send: function(){
    var cost = $('.manager_form .cost').val();
    var lastHour = $('.manager_form .hour').val();
    var data = {name: 'manager',
      options: {
        cost: cost,
        lastHour:lastHour
      }
    }
    console.log(data);
    this.model.set(data);
    this.model.save(data);
    // this.model.save(data, {
    // success: function (model, response) {
    //   console.log('ok');
    //   console.log(model);
    // },
    // error: function (model, error) {
    //   console.log(model.toJSON());
    //   console.log(error);
    // }});

  }
})
