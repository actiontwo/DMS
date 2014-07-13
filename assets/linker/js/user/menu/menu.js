//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          Display full list menu, Search 
// Class:
//          MenuModel, MenuCollection, MenuView
// Functions:
//          
// Called From:
//          
// Author:
//          Hien Lam - hienlt@designveloper.com
// Notes:
//          
// Changelog:
//          06/13/2014 - HIEN LAM
//         
// ============================================================================
var MenuModel = Backbone.Model.extend({
  urlRoot: "/menu"
});
var MenuCollection = Backbone.Collection.extend({
  url: "/menu",
  model: MenuModel
});
// -------------------------------------------------------------------
// MenuView
//
// PARAMETERS:
//            @parameter1 () collection DepositCollection
// METHODS:
//            initialize, render, collectionChange, search
// DEPENDENCIES:
//            SearchController
// PURPOSE:
//            To create view page menu
// NOTES:
//            none
// REVISIONS:
//            06/13/14 - Hien Lam
// -------------------------------------------------------------------
var MenuView = Backbone.View.extend({
  model: new MenuModel(),
  collection: new MenuCollection(),
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function () {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset  destroy', this.render);
  },
  render: function () {
    this.$el.html(Templates['user/mem-view-menu'](
      this.collection
    ));
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .btn-black': 'search',
      'click .saveSuggest': 'saveSuggest'
    });
    return this;
  },
  // Search
  //
  // PARAMETERS:
  //
  // METHODS:
  //
  // DEPENDENCIES:
  //            searchCollection
  // PURPOSE:
  //            Display search.
  //            Get data from server follow dateFrom and dateTo.
  // NOTES:
  //
  // REVISIONS:
  //            06/13/14 - Hien Lam
  // -------------------------------------------------------------------
  search: function (events) {
    var dateFromString = $('.dateFrom').val();
    var dateToString = $('.dateTo').val();
    var dateFrom = new Date(dateFromString);
    var dateTo = new Date(dateToString);
    if (dateFrom > dateTo){
      alert('Input invalid. dateFrom must be less than dateTo');
      return;
    }
    var tempMenuCollection = new MenuCollection();

    this.collection.each(function(model){
      var thisModelDate = new Date(model.attributes.date);
      if (thisModelDate >= dateFrom && thisModelDate <= dateTo)
      {
        tempMenuCollection.add(model);
      }
    });

    this.$el.html(Templates['user/mem-view-menu'](
      tempMenuCollection
    ));
    initDatePicker($('.datepicker'));
    this.delegateEvents({
      'click .btn-black': 'search',
      'click .saveSuggest': 'saveSuggest'
    });
    //update dateFrom input & dateTo input
    $('.dateFrom').val(dateFromString);
    $('.dateTo').val(dateToString);
  },
  saveSuggest: function(){
    $.post('/suggest',
      {
        suggestMeal: $('.txt-suggest').val(),
        note: $('.txt-suggest-note').val()
      }, function(data){
        $('#save-suggest-success').fadeIn();
        console.log(data);
      });
  }
});

