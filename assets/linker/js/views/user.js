var UserView = Backbone.View.extend({
	//declare el 
	tagName:'div',
	className:'container',
	id:'user-register',
	//end el
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
		//set value for model then save model
		model.set({
			'email':this.$el.find('#Email').val(),
			'password':this.$el.find('#Password').val(),
			'confirm':this.$el.find('#Confirm').val(),
		});
		//check password and comfirm match
		if(model.get('password')!=model.get('confirm'))
			alert('Password not match');
		//check valid model, 
		model.on('invalid',function(model,err){
			alert(err);
			return;
		})
		model.save(null,{
			success: function(model, response) {
			    console.log('success');
			},
			error: function(model, response) {
			    alert(response.responseText);
			}
		});
		this.render();
	}
}) 