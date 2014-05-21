var UserModel = Backbone.Model.extend({
	urlRoot:'/user',
	validate:function(attr,option){
		if(_.isEmpty(attr.email))
			return 'Please enter email';
		if(_.isEmpty(attr.password))
			return 'Password can not empty';
		if(_.isEmpty(attr.confirm))
			return 'Please enter confirm password';
		if(attr.password!=attr.confirm)
			return 'confirm and password not match';
		
	}
});