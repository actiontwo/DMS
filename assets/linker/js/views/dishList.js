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
//          DishListView
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
// DishListView ( @parameter1 )
//
// PARAMETERS:
//            @parameter1 () collection DishListCollection
// METHODS:
//            initialize, render, 
// DEPENDENCIES:
//            Backbone.View
// PURPOSE:
//            Use this class to create new menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DishListView = Backbone.View.extend({
  tagName: 'div',
  className: 'mn-create-dish',
  id: 'create_dish',
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
//            init class DishListView
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize: function() {
    this.listenTo(this.collection, 'sync reset sort', this.render);
  },
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
//            render view for page menu/create Dish
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  render: function() {
    this.$el.html(Templates['menu/create_dish']({
      listdish: this.collection.toJSON()
    }));
    displayCalendar();
  },
  events:{
    'click #btn-save': 'saveDish'
  },
// -------------------------------------------------------------------
// saveDish (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            add a new dish into listdish
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  saveDish: function(){
    var model = new DishListModel;
    model.set({dish:$('#dishname').val()});
    if(model.get('dish')!=''){
      model.save();
      this.collection.add(model);
    }else{
      alert('Please enter dish name!');
    }
  }
});