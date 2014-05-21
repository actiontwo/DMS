var UserView = Backbone.View.extend({
	tagName:'div',
	className:'container',
	id:'user-register',
	initialize:function(){
		this.render();
	},
	render:function(){
		this.$el.html(Templates['user/register']);
		return this.el;
	},
	events:{
		'click .btn-end':'registerUser'
	},
	registerUser:function(){
		var model = new UserModel;
		model.set({
			'email':this.$el.find('#Email').val(),
			'password':this.$el.find('#Password').val(),
			'confirm':this.$el.find('#Confirm').val(),
		});
		model.on('invalid',function(model,err){
			alert(err);
			return;
		})
		model.save();
		this.render();
	}
}) 