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
//          DishMenuModel
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/js/collections/dishMenu.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DishMenuModel, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DishMenuModel (  )
//
// PARAMETERS:
//            
// METHODS:
//            
// DEPENDENCIES:
//            none
// PURPOSE
//            a model dishmenu typical a row in table menu in page menu 
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DishMenuModel = Backbone.Model.extend({
	urlRoot:'/menu',
	validate:function(attr,option){
		//check if date user enter invalid type date
		if(_.isDate(attr.date))						
			return "You must enter date";
		//check brunch not empty
		if(_.isEmpty(attr.brunch))					
			return "Please enter brunch";
		return this.checkList(attr);
	},
// -------------------------------------------------------------------
// checkList ( attr )
//
// PARAMETERS:
//            attr: model.attributes
// RETURNS:
//            info error when check validate
// DEPENDENCIES:
//            
// PURPOSE:
//            when user click button delete selected,
//            delete all row,  checked,
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	checkList:function(attr){
		//declare and initialize dish1,2,3,4,5
		var dish1,dish2,dish3,dish4,dish5;			
		dish1=dish2=dish3=dish4=dish5=false;		
		for(i in dishListCollection.models)
		{
			//list is a dish from listdish
			var list = dishListCollection.models[i].attributes.dish;
			//if dish is empty or dish equal list, dish is valid
			if(list==attr.dish1||_.isEmpty(attr.dish1))				
				dish1='true';
			if(list==attr.dish2||_.isEmpty(attr.dish2))
				dish2='true';
			if(list==attr.dish3||_.isEmpty(attr.dish3))
				dish3='true';
			if(list==attr.dish4||_.isEmpty(attr.dish4))
				dish4='true';
			if(list==attr.dish5||_.isEmpty(attr.dish5))
				dish5='true';
		}
		//if after for loop dish equal false value, then dish value invalid

		if(dish1==false)
			return 'dish1 invalid please enter again';
		if(dish2==false)
			return 'dish2 invalid please enter again';
		if(dish3==false)
			return 'dish3 invalid please enter again';
		if(dish4==false)
			return 'dish4 invalid please enter again';
		if(dish5==false)
			return 'dish5 invalid please enter again';

	}
})