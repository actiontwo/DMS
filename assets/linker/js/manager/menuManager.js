//Declare Model
var MenuManagerModel = Backbone.Model.extend({
  urlRoot: "/menu"
});
//Declare Collection
var MenuManagerCollection = Backbone.Collection.extend({
  url: "/menu",
  model: MenuManagerModel
});
var dish;
var MenuManagerView = Backbone.View.extend({
  model: new MenuManagerModel,
  collection: new MenuManagerCollection,
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function () {
    this.listenTo(this.collection, 'reset change add remove', this.render);
    $.get('/dish', function (data) {
      dish = [];
      for (var i = 0; i < data.length; i++) {
        dish.push(data[i].dish)
      }
    });
  },
  render: function () {
    this.$el.html(Templates['admin/Manager/menuManager'](this.collection));
    autoComplete($('.modalDish'), dish);
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .saveDish': 'saveDish',
      'click .edit-menu': 'editMenu',
      'click #saveMenu': 'saveMenu',
      'click .delete-menu': 'deleteMenu',
      'click #addNewMenu': 'addNewMenu',
      'click #searchByDay': 'searchByDay'
    });
    return this;
  },
  addNewMenu: function () {
    var data = {date: '', dish: '', note: '', id: ''};
    this.setValuePopup(data);
  },
  saveDish: function () {
    var dish = $('.dishname');
    var note = $('.dishnote');
    var data = {
      dish: dish.val(),
      note: note.val()
    };
    this.model.urlRoot = '/dish';
    this.model.save(data, {
      success: function (model, res) {
        console.log(res);
      },
      error: function (model, err) {
        console.log(err);
      }
    });
    this.model.urlRoot = '/menu';
    dish.val('');
    note.val('')
  },
  editMenu: function (el) {
    var ev = $(el.currentTarget);
    var id = ev.parents('tr').data('id');
    var dataModel = this.collection.get(id);
    var data = {
      date: dataModel.attributes.date,
      dish: dataModel.attributes.dish,
      note: dataModel.attributes.note,
      id: id
    };
    this.setValuePopup(data);
  },
  saveMenu: function (el) {
    $('.modal-backdrop').hide();
    $('body').removeClass('modal-open');
    var ev = $(el.currentTarget);
    var dishEdit = [];
    $('.modalDish').each(function () {
      dishEdit.push($(this).val());
    });
    var data = {
      date: $('.modalDate').val(),
      brunch: $('.modalBrunch').val(),
      dish: dishEdit,
      note: $('.modalNote').val()
    };
    console.log(data);
    var id = ev.parents('#modal-container-menu').data('id');
    var model;
    if (id)
      model = this.collection.get(id).set(data);
    else
      model = this.collection.add(data);

    model.save();
  },
  deleteMenu: function (el) {
    var ev = $(el.currentTarget);
    var id = ev.parents('tr').data('id');
    this.collection.get(id).destroy();
  },
  setValuePopup: function (data) {
    $('#modal-container-menu').attr('data-id', data.id);
    $('.modalDate').val(data.date);
    $('.modalDish').each(function () {
      $(this).val(data.dish[$(this).data('index')]);
    });
    $('.modalNote').val(data.note);
  },
  searchByDay: function(){
    var dateFromString = $('.dateFrom').val();
    var dateToString = $('.dateTo').val();
    var dateFrom = new Date(dateFromString);
    var dateTo = new Date(dateToString);
    if (dateFrom > dateTo){
      alert('Input invalid. dateFrom must be less than dateTo');
      return;
    }
    var tempMenuCollection = new MenuManagerCollection();

    this.collection.each(function(model){
      var thisModelDate = new Date(model.attributes.date);
      if (thisModelDate >= dateFrom && thisModelDate <= dateTo)
      {
        tempMenuCollection.add(model);
      }
    });

    this.$el.html(Templates['admin/Manager/menuManager'](tempMenuCollection));
    autoComplete($('.modalDish'), dish);
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .saveDish': 'saveDish',
      'click .edit-menu': 'editMenu',
      'click #saveMenu': 'saveMenu',
      'click .delete-menu': 'deleteMenu',
      'click #addNewMenu': 'addNewMenu',
      'click #searchByDay': 'searchByDay'
    });

    //update dateFrom input & dateTo input
    $('.dateFrom').val(dateFromString);
    $('.dateTo').val(dateToString);
  }
});