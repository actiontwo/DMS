var LoginView = Backbone.View.extend({
	//declare el 
	tagName:'div',
	className:'container',
	id:'user-register',
	//end el
	initialize:function(){
		this.render();
	},
	render:function(){
		this.$el.html(Templates['user/register'](this.model.toJSON()));
		return this.el;
	},
	events:{
		'click .btn-end':'registerUser'
	},
	registerUser:function(){
		
	}
});