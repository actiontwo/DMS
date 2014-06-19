var DepositManagerModel = Backbone.Model.extend({
  urlRoot: '/deposit'
});
var DepositManagerCollection = Backbone.Collection.extend({
  url: '/deposit',
  model: DepositManagerModel
});
var source = {name: [], email: []};
DepositManagerView = Backbone.View.extend({
  collection: new DepositManagerCollection(),
  model: new DepositManagerModel(),
  tagName: 'div',
  id: 'Deposit_Manager',
  className: 'menus',
  initialize: function () {
    this.listenTo(this.collection, 'reset change add remove', this.render);
    $.get('/user', function (data) {
      var name = [];
      var email = [];
      for (i = 0; i < data.length; i++) {
        name.push(data[i].firstname + " " + data[i].lastname);
        email.push(data[i].email);
      }
      source.name = name;
      source.email = email;
    });
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/depositManager'](this.collection));
    initDatePicker($('.datepicker'));
    autoComplete($('.inputEmail'), source.email);
    autoComplete($('.inputName'), source.name);
    this.delegateEvents({
      'click #addDeposit': 'addDeposit',
      'click .save': 'saveValue',
      'click .edit': 'editDeposit',
      'click .delete': 'deleteDeposit'
    });
    return this;
  },
  deleteDeposit: function (el) {
    var ev = $(el.currentTarget);
    var id = ev.parents('tr').data('id');
    this.collection.get(id).destroy();
  },
  editDeposit: function (el) {
    var ev = $(el.currentTarget);
    this.collection.get(ev.parents('tr').data('id')).set({edit: true, update: true});
  },
  saveValue: function (el) {
    var ev = $(el.currentTarget);
    var data = {
      email: ev.parents('tr').find('.inputEmail').val(),
      name: ev.parents('tr').find('.inputName').val(),
      amount: ev.parents('tr').find('.inputAmount').val(),
      date: ev.parents('tr').find('.inputDate').val()
    };
    for (key in data) {
      if (!data[key]) {
        alert('Data not empty');
        return;
      }
    }
    data.edit = false;
    var model = this.collection.get(ev.parents('tr').data('id')).set(data);
    if (model.attributes.new) {
      delete model.attributes.id;
      delete model.attributes.new;
    }
    model.save();
  },
  addDeposit: function () {
    var data = {
      id: Math.floor(Math.random() * 10000000000 + 1),
      edit: true,
      email: '',
      name: '',
      amount: '',
      date: '',
      new: true
    };
    this.collection.add(data);
  }
});