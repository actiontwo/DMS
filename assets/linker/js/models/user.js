var UserModel = Backbone.Model.extend({
	urlRoot:'/user',
	validate:function(attr,option){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(_.isEmpty(attr.email))
			return 'Please enter email';
		if(!re.test(attr.email))
			return 'Email not valid';
		if(_.isEmpty(attr.password))
			return 'Password can not empty';
		if(_.isEmpty(attr.confirm))
			return 'Please enter confirm password';
		

	}
});