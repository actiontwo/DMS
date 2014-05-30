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
//          DishListCollection
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DishListCollection, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DishListCollection (  )
//
// PARAMETERS:
//            
// METHODS:
//            
// DEPENDENCIES:
//            none
// PURPOSE:
//            collection DishlishModel , include all dish Create List
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DishListCollection = Backbone.Collection.extend({
	url:'/dish',
	model: DishListModel
})