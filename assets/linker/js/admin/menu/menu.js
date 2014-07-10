//Declare Model
var MenuModel = Backbone.Model.extend({
  urlRoot: "/menu"
});
//Declare Collection
var MenuCollection = Backbone.Collection.extend({
  url: "/menu",
  model: MenuModel
});
var dish;
var menuIdToBeDeleted = '';
var MenuView = Backbone.View.extend({
  model: new MenuModel,
  collection: new MenuCollection,
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function () {
    this.listenTo(this.collection, 'reset change add remove', this.render);
  },
  render: function () {
    this.$el.html(Templates['admin/menu/menu'](this.collection));
    //autoComplete($('.modalDish'), dish);
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .edit-menu': 'editMenu',
      'click #saveMenu': 'saveMenu',
      'click .delete-menu': 'getMenuIdToBeDeletd',
      'click .btnDeleteMenu': 'deleteMenu',
      'click #addNewMenu': 'addNewMenu',
      'click #searchByDay': 'searchByDay',
      'click #printMenu': 'printMenu'
    });
    return this;
  },
  addNewMenu: function () {
    var data = {date: '', dish: '', note: '', id: ''};
    this.setValuePopup(data);
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
    if (!data.date){
      alert('Invalid date input !');
      return;
    }
    console.log(data);
    var id = ev.parents('#modal-container-menu').data('id');
    var model;
    if (id)
      model = this.collection.get(id).set(data);
    else
      model = this.collection.add(data);
    model.save(null, {
      error: function(model, res) {
        console.log('error: ' + res.id);
      },
      success: function (model, res) {
        console.log('success: ' + res.id);
      }
    });
  },
  getMenuIdToBeDeletd: function (el) {
    var ev = $(el.currentTarget);
    menuIdToBeDeleted = ev.parents('tr').data('id');
    //this.collection.get(id).destroy();
  },
  deleteMenu: function(el){
    this.collection.get(menuIdToBeDeleted).destroy();
    $('.modal-backdrop').hide();
    $('body').removeClass('modal-open');
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

    this.$el.html(Templates['admin/admin/menuManager'](tempMenuCollection));
    //autoComplete($('.modalDish'), dish);
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .saveDish': 'saveDish',
      'click .edit-menu': 'editMenu',
      'click #saveMenu': 'saveMenu',
      'click .delete-menu': 'getMenuIdToBeDeletd',
      'click .btnDeleteMenu': 'deleteMenu',
      'click #addNewMenu': 'addNewMenu',
      'click #searchByDay': 'searchByDay',
      'click #printMenu': 'printMenu'
    });

    //update dateFrom input & dateTo input
    $('.dateFrom').val(dateFromString);
    $('.dateTo').val(dateToString);
  },
  printMenu: function(){
    window.print();
  }
});