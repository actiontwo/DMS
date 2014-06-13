//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          Display full Expense, Search 
// Class:
//          ExpenseModel, ExpenseCollection, ExpenseView
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
var ExpenseModel = Backbone.Model.extend({
  urlRoot: '/expense'
});

var ExpenseCollection = Backbone.Collection.extend({
  url: "/expense",
  model: ExpenseModel
});

var ExpenseView = Backbone.View.extend({
  model: new ExpenseModel,
  tagName: 'div',
  className: 'menus',
  id: 'expense_menu',
  initialize: function(options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);
    this.listenTo(this.model, 'change', this.collectionChange);
  },
  render:function (){
    this.$el.html(Templates['user/mem-expense']({
       'expense' : this.collection.toJSON()
     }));
    var i =1;
    $('tbody tr').find('td:first-child').each(function(){
      $(this).html(i);i++
    })
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
      model : 'Expense'
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

    this.model.urlRoot = '/expense';
   
  }
});
