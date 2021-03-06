var DepositModel = Backbone.Model.extend({
  urlRoot: '/deposit'
});
var DepositCollection = Backbone.Collection.extend({
  url: '/deposit',
  model: DepositModel
});
var source = {name: [], email: []};
var DepositView = Backbone.View.extend({
  collection: new DepositCollection(),
  model: new DepositModel(),
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
    this.$el.html(Templates['admin/deposit/deposit'](this.collection));
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
    for (var key in data) {
      if (!data[key]) {
        alert('Data not empty');
        return;
      }
    }
    data.edit = false;
    var model = this.collection.get(ev.parents('tr').data('id'));
    if (model.attributes.new) {
      delete model.attributes.id;
      delete model.attributes.new;
    }
    //check email
    $.post('/deposit/validate',{data:data},function(response){
      switch (response) {
        case 'email_404':
          alert('Email input is not found');
          break;
        default:
          if (data.amount.match(/^[1-9][0-9]*000$/) == null){
            alert('Amount is not money format!');
          } else model.save(data);
      }
    });

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