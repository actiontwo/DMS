var DishMenuModel = Backbone.Model.extend({
	urlRoot:'/menu',
	validate:function(attr,option){
		if(attr.date=='')
			return "You must enter date";
		if(attr.brunch=='')
			return "Please enter brunch";
		var dish1,dish2,dish3,dish4,dish5;
		dish1=dish2=dish3=dish4=dish5=false;
		for(i in dishListCollection.models)
		{
			var list = dishListCollection.models[i].attributes.dish;

			switch(list){
				case attr.dish1:
					dish1='true';
					break;
				case attr.dish2:
					dish2='true';
					break;
				case attr.dish3:
					dish3='true';
					break;
				case attr.dish4:
					dish4='true';
					break;
				case attr.dish5:
					dish5='true';
					break;
			}
		}

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