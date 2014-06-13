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
    this.listenTo(this.model, 'change', this.collectionChange);
  },
  render: function () {
    this.$el.html(Templates['user/mem-view-menu'](
      this.collection
    ));

    initDatePicker($('.datepicker'));
    return this;
  },
  collectionChange:function(){
     this.collection.reset();
    for( key in this.model.attributes){
      if(key !== 'dateFrom' && key !== 'dateTo' && key !== 'model'){
          this.collection.add(this.model.attributes[key]);
      }  
    }
    this.render();
  },
  events : {
    'click .btn-black' : 'search'
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
  search : function(events){
    var from = $('li.find-from input').val();
    var to = $('li.find-to input').val();
    if(from > to || from == '' || to == ''){
      alert('Input invalid. From must be less To');
      return;
    } 
    events.preventDefault();
    var data = {
      dateFrom: from,
      dateTo: to,
      model : 'Menu'
    }

   this.model.urlRoot = '/search';
   this.model.save(data, {
    success: function (model, response) {
      console.log(model);
    },
    error: function (model, error) {
      console.log(model.toJSON());
      console.log(error);
    }});

    this.model.urlRoot = '/menu';
   
  }


});
