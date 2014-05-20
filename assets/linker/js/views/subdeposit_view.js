var SubDepositView = Backbone.View.extend({
	initialize:function(){
		this.listenTo(this.model ,'sync', this.render);
	},
	render:function(){
		this.$el.html(Templates['deposit/sub_deposit'](this.model.attributes));
		//display calendar
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
		'change input':'updateDeposit',
	},
	editDeposit:function(){
		//if editor is true model render views which user can edit value,
		//otherwise model render view which you can't edit value 
		this.model.set({editor:'true'});
		this.render();
	},
	removeDeposit:function(){
		this.model.destroy();
	},
	saveDeposit:function(){
		this.model.on('invalid',function(model,err){
			alert(err);
			//if user input invalid, user can continue input again
			this.model.set({editor:'true'});	
		});
		this.model.save();
		this.model.unset('editor');	//unset editor then  render normal views,views can't input 
		this.render();

	},
	updateDeposit:function(ev){
		//update model every input change value
		this.model.set($(ev.currentTarget).data('attribute'),$(ev.currentTarget).val());
	}
})