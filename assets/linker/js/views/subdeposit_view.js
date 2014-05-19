var SubDepositView = Backbone.View.extend({
	render:function(){
		this.$el.html(Templates['deposit/sub_deposit'](this.model.attributes));
		return this.el;
	}
})