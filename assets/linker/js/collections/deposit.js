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
//          DepositCollection
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DishMenuView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DepositCollection (  )
//
// PARAMETERS:
//            
// METHODS:
//            
// DEPENDENCIES:
//            none
// PURPOSE:
//            collection Deposit Page, include all row in table deposit page
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DepositCollection = Backbone.Collection.extend({
	url:'/deposit',
	model:DepositModel
	
})