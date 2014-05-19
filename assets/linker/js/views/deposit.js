var DepositView = Backbone.View.extend({
	tagName:'div',
	className:'deposit',
	id:'deposit',
	subViews:{},
	initialize:function(){
		this.render();
		this.listenTo(this.collection, 'sync reset sort',this.render );
	},
	render:function(){
		this.$el.html(Templates['deposit/deposit']({'deposit':this.collection.toJSON()}));
		for(i in this.collection.models){
			var model = this.collection.models[i];
			var subviewdeposit = new SubDepositView({model:model,el:this.$('tr[data-id="'+model.id +'"]')});
			subviewdeposit.render();
			this.subViews[model.id] = subviewdeposit;
		}
		this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        this.auto_index();
        return this;
	},
	auto_index:function(){
		var i =1;
		$('tbody').find('tr td:first-child').each(function(){
			$(this).html(i);
			i++;
		});
	}
})