var DishMenuModel = Backbone.Model.extend({
	urlRoot:'/menu',
	validate:function(attr,option){
		if(_.isDate(attr.date))						//check if date user enter invalid type date
			return "You must enter date";
		if(_.isEmpty(attr.brunch))					//check brunch not empty
			return "Please enter brunch";
		var dish1,dish2,dish3,dish4,dish5;			//declare and initialize dish1,2,3,4,5
		dish1=dish2=dish3=dish4=dish5=false;		
		for(i in dishListCollection.models)
		{
			var list = dishListCollection.models[i].attributes.dish;//list is a dish from listdish
			if(list==attr.dish1||_.isEmpty(attr.dish1))				//if dish is empty or dish equal list, dish is valid
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