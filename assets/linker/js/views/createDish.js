//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create new row for user input dishlish 
// Class:
//          CreateDishView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Phuc Nguyen - Init CreateDishView, refactor code.
// ============================================================================
//   
// -------------------------------------------------------------------
// CreateDishView ( menuModel )
//
// PARAMETERS:
//            menuModel () model menuModel
// METHODS:
//            render, updateModel, fullFill
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var CreateDishView = Backbone.View.extend({
// -------------------------------------------------------------------
// render (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            render view, a row in page create menu
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen   
// -------------------------------------------------------------------
  render: function() {
    this.$el.html(Templates['menu/dish_menu'](this.model.attributes));
    displayCalendar();
    return this.el;
  },
 events: {
   'change input, select': 'updateModel',
   'keyup  input.dish, select': 'FillDish'
},

// -------------------------------------------------------------------
// updateModel (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            update Model when user input on model
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
 updateModel: function(ev) {
   this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
 },
// -------------------------------------------------------------------
// FillDish (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            auto select when user chose a dish list
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  FillDish:function(ev){
    fillDish(ev,this);
  }
   
})




