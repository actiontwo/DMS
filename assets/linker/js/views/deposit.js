var DepositView = Backbone.View.extend({
	tagName:'div',
	className:'deposit',
	id:'deposit',
	subViews:{},
	initialize:function(){
		this.render();
		this.listenTo(this.collection, 'sync reset sort remove',this.render );
		this.collection.sort_order ={
			'date':1,
			'username':1,
			'amount':1
		}
	},
	render:function(){
		this.$el.html(Templates['deposit/deposit']({'deposit':this.collection.toJSON(),'user':userCollection.toJSON()}));
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
	},
	events:{
		'click #btn-create-deposit': 'Create_Deposit',
		'click th':'SortDeposit'
	},
	Create_Deposit:function(){
		var model = new DepositModel;
		model.set({
			'date':$('#date').val(),
			'username':$('#deposit-new-user').val(),
			'amount':$('#deposit-amount').val()
		});
		this.collection.add(model);
		model.save();
	},
	SortDeposit:function(ev){
		var attribute = $(ev.currentTarget).data('attribute');
		this.collection.comparator = function(menuA,menuB){
			 if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
           	 return 0;
		}
		this.collection.sort();
		 this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
	}
})