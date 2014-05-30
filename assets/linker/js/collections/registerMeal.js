// =============================================================================
// ,,,,,,,,, ,,,
// ,,,,,,,, ,,,  Copyright:
// ,,,     ,,,          This source is subject to the Designveloper JSC
// ,,,    ,,,           All using or modify must have permission from us.
// ,,,   ,,,            http://designveloper.com
// ,,,,,,,,
// ,,,,,,,       Name:  DSVScriptTemplate
//
// Purpose:
//          Declare RegisterMealCollection
// Class:
//          RegisterMealCollection
// Called From:
//          (script) assets/linker/js/routes.js, 
//			assets/linker/js/views/registerMeal.js,
//			assets/linker/js/views/viewMealRegistration.js
// Author:
//          Son Le (sontl@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Son Le - Added DSV code style.
// =============================================================================
RegisterMealCollection = Backbone.Collection.extend({
  url: "/registermeal",
  model: RegisterMealModel
});