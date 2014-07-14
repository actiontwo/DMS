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
    var dayFromString = $('.dateFrom').val();
    var dayToString = $('.dateTo').val();
    if (dayFromString.length==0 || dayToString.length==0)
    {
      $('#datepicker-empty-error').fadeIn().delay(2500).fadeOut();
      return;
    }
    var dayFromObj = new Date(dayFromString);
    var dateToObj = new Date(dayToString);
    if (dayFromObj > dateToObj){
      $('#datepicker-invalid-error').fadeIn().delay(2500).fadeOut();
      return;
    }
    var tempMenuCollection = new MenuCollection();
    var $this = this;

    $.post('/menu/searchByDay',
      {
        "dayFrom": dayFromString,
        "dayTo": dayToString
      }, function(data){
        tempMenuCollection.reset(data);
        //re-render
        $this.$el.html(Templates['user/mem-view-menu'](tempMenuCollection));
        $this.delegateEvents({
          'click .btn-black': 'search',
          'click .saveSuggest': 'saveSuggest'
        });
        // initialize datepicker
        initDatePicker($('.datepicker'));
        // update information for the search query area
        $('.dateFrom').val(dayFromString);
        $('.dateTo').val(dayToString);
      });
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

