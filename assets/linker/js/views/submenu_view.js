//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create page menu, display full list menu created 
// Class:
//          SubMenuView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Phuc Nguyen - Init DishMenuView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// SubMenuView ( model,el )
//
// PARAMETERS:
//            @parameter1 () model MenuModel
//            @parameter2 () el element dom 
// METHODS:
//            initialize, render, renderSubMenu, renderFilter
//            sortMenu, prevPage, nextPage, selecPerPage, filterMenu
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this class to create Sub View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var SubMenuView = Backbone.View.extend({
// -------------------------------------------------------------------
// initialize (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            init class SubMenuView
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize:function(){
	this.listenTo(this.model ,'sync', this.render);
  },
// -------------------------------------------------------------------
// render (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            render a row in menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  render: function() {
    this.$el.html(Templates['menu/submenu_view'](this.model.attributes));
    return this.el;
  },
  events:{
    'click #button-edit-menu' : 'editMenu',
    'click #button-save-menu': 'saveMenu',
    'click #button-remove-menu':'removeMenu',
    'change input, select': 'updateModel',
    'keyup  input.dish, select': 'fillDish'
  },
// -------------------------------------------------------------------
// editMenu (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            el
// DEPENDENCIES:
//            
// PURPOSE:
//            edit a row in menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  editMenu: function() {
    //when user click edit icon all element in row convert input or select
    //if editor value is true, view render input and select,
    // else view render tag td and text inside
    this.model.set({input:'true'})
    var brunch = this.model.get('brunch');
    this.render();
    this.model.unset(input);
    //display calendar
    displayCalendar();
    //update html display brunch                              
    this.$('.brunch').val(brunch);              
  },
// -------------------------------------------------------------------
// removeMenu (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            delete a row in menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  removeMenu:function(){
    this.model.destroy();
  },
// -------------------------------------------------------------------
// saveMenu (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            update a row in menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  saveMenu:function(){ 
    //fix function fillDish working correct  
    $('#list_dish_menu').appendTo('.table').css('display','none');
    //check valid input 
    this.model.on("invalid",function(model,err){
      alert(err);
      this.model.unset('input');
    });	   	
    this.model.save();
    this.model.unset('input');
    this.render();
  },
// -------------------------------------------------------------------
// updateModel (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            update data temp when user input
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  updateModel: function(ev) {
    this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
  },
// -------------------------------------------------------------------
// fillDish (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            auto select when user key up dish to chose dish menu
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  fillDish:function(ev){
    fillDish(ev,this);
  }
  
});