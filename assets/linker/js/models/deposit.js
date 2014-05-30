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
//          DepositModel
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/js/collections/deposit.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DepositModel, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DepositModel (  )
//
// PARAMETERS:
//            
// METHODS:
//            
// DEPENDENCIES:
//            none
// PURPOSE:
//            a model deposit typical a row in table deposit 
//						in page deposit
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DepositModel = Backbone.Model.extend({
	urlRoot:'/deposit',
	validate:function(attr,option){
		//check user input is Valid
		if(attr.amount<=0)
			return "amount not nagative";
		if(attr.amount  != parseInt(attr.amount))
			return "amount must be integer";
		if(attr.date=='') //check date 
			return "You must enter date";
		if(attr.username=='')
			return "You must be select name";

	}
})