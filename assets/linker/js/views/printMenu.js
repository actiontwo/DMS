//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create print menu, display full list menu created 
// Class:
//          PrintMenuView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Phuc Nguyen - Init PrintMenuView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// PrintMenuView ( @parameter1 )
//
// PARAMETERS:
//            @parameter1 () collection DishMenuCollection
// METHODS:
//            initialize, render, renderFilter, filterMenu
//            sortMenu,
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var PrintMenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'mn-print-menu',
  id: 'print_menu',
// -------------------------------------------------------------------
// initialize (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            init class DishMenu
// PURPOSE:
//            render view for print page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize: function() {
    this.listenTo(this.collection, 'sync reset sort', this.render);
    this.collection.sort_order = {
      date: 1,
      brunch: 1,
      dish1: 1,
      dish2: 1,
      dish3: 1,
      dish4: 1,
      dish5: 1,
      note: 1
    };
  },
// -------------------------------------------------------------------
// render (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            rendersubView
// PURPOSE:
//            render view for print page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen,Duong Linh
// -------------------------------------------------------------------
  render: function() {
    this.$el.html(Templates['menu/print_menu']({
    menu: this.collection.toJSON()
    }));
    // Calendar
    displayCalendar();//display calendar jquery ui
      return this;
    },
    events: {
      'click th': 'sortMenu',
      'click .confirm':'filterMenu'
  },
// -------------------------------------------------------------------
// sortMenu ( ev )
//
// PARAMETERS:
//            ev: events
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            when user click header table, menu page display data sorted
// NOTES:
//            none
// REVISIONS:
//            05/01/2014: Hung Vo
// -------------------------------------------------------------------
  sortMenu: function(ev) {
    var attribute = $(ev.currentTarget).data('attribute');
    this.collection.comparator = function(menuA, menuB) {            
      if (menuA.get(attribute) > menuB.get(attribute)) 
        return this.sort_order[attribute];
      if (menuA.get(attribute) < menuB.get(attribute)) 
        return -this.sort_order[attribute];
      return 0;
    };
    this.collection.sort();
    // reverse sort direction
    this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
  },
// -------------------------------------------------------------------
// filterMenu (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            filter dish menu with date, if dish menu have date term condition 
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen, Duong Linh
// -------------------------------------------------------------------
  filterMenu:function(){
    var from = $('.find-from input').val();
    var to   = $('.find-to input').val();
    if(from>to||from===''||to===''){
      alert('Input invalid');
      return;
    }
    var event = _.filter(this.collection.toJSON(),function(model){
      return (model.date>=from&&model.date<=to);
    });
    //check result search   
    //render view
    this.$el.html(Templates['menu/print_menu']({
        menu: event
    }));
    //calendar
    displayCalendar();
    $('.find-from input').val(from);
    $('.find-to input').val(to);
  },
});