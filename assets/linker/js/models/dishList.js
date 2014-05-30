//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create model using in collection 
// Class:
//          DishListModel
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/js/collections/dishList.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DishListModel, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DishListModel (  )
//
// PARAMETERS:
//            
// METHODS:
//            
// DEPENDENCIES:
//            none
// PURPOSE:
//            a model dishlist typical a dish  in page Create List 
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DishListModel = Backbone.Model.extend({
	url:"/dish"
})