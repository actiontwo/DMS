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
//          Declare ExpenseMenuCollection
// Class:
//          ExpenseMenuCollection
// Called From:
//          (script) assets/linker/js/routes.js, assets/linker/js/views/expenseMenu.js
// Author:
//          Son Le (sontl@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Son Le - Added DSV code style.
// =============================================================================
ExpenseMenuCollection = Backbone.Collection.extend({
  url: "/expense",
  model: ExpenseMenuModel
})