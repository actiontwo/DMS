var SubDepositView = Backbone.View.extend({
	initialize:function(){
		this.listenTo(this.model ,'sync', this.render);
	},
	render:function(){
		this.$el.html(Templates['deposit/sub_deposit'](this.model.attributes));
		this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
		return this.el;
	},
	events:{
		'click #btn-edit-deposit':'editDeposit',
		'click #btn-remove-deposit':'removeDeposit',
		'click #btn-save-deposit':'saveDeposit',
		'change input':'updateDeposit'
	},
	editDeposit:function(){
		var date = this.model.get('date');
		var no = this.$el.find('td:first-child').html();
		console.log(no);
		this.model.unset('date');
		this.render();
		this.model.set({date:date});
		$('.date').val(date);
		this.$el.find('td:first-child').html(no);
	},
	removeDeposit:function(){
		this.model.destroy();
	},
	saveDeposit:function(){
		this.model.save();
		this.render();
	},
	updateDeposit:function(ev){
		this.model.set($(ev.currentTarget).data('attribute'),$(ev.currentTarget).val());
	}
})