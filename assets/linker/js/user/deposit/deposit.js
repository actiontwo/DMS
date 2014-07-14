//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          Display full deposit, Search
// Class:
//          DepositModel, DepositCollection, DepositView
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
var DepositModel = Backbone.Model.extend({
  urlRoot: '/deposit/1'
});
var DepositCollection = Backbone.Collection.extend({
  url: "/deposit/1",
  model: DepositModel
});
var DepositView = Backbone.View.extend({
  model: new DepositModel,
  tagName: 'div',
  className: 'menus',
  id: 'expense_menu',
  initialize: function(options) {
    //listen event on collection if collection change then render view
    this.listenTo(this.collection, 'reset destroy sort sync remove change', this.render);
    this.listenTo(this.model, 'change', this.collectionChange);
  },
  render:function (){
    this.$el.html(Templates['user/mem-deposit']({
      'deposit': this.collection.toJSON()
    }));
//    var i =1;
//    $('tbody tr').find('td:first-child').each(function(){
//      $(this).html(i);
//      i++
//    });
    this.delegateEvents({
      'click #searchDeposit': 'search'
    });
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
    var dayFromString = $('.dayFrom').val();
    var dayToString = $('.dayTo').val();
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

    var tempDepositCollection = new DepositCollection();
    var $this = this;

    $.post('/deposit/searchByDay',
      {
        "dayFrom": dayFromString,
        "dayTo": dayToString
      }, function(data){
        tempDepositCollection.reset(data);
        //re-render
        $this.$el.html(Templates['user/mem-deposit']({
          'deposit': tempDepositCollection.toJSON()
        }));
        // initialize datepicker
        initDatePicker($('.datepicker'));
        $this.delegateEvents({
          'click #searchDeposit': 'search'
        });
        // update information for the search query area
        $('.dayFrom').val(dayFromString);
        $('.dayTo').val(dayToString);
      });
  }
});
