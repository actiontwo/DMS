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
	}
}) 