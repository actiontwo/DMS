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
		'click #btn-create-deposit': 'createDeposit',
		'click th':'sortDeposit',
		'change #user-deposit':'filterDeposit1',
		'click .confirm':'filterDeposit'
	},
	createDeposit:function(){
		var model = new DepositModel;
		model.set({
			'date':$('#date').val(),
			'username':$('#deposit-new-user').val(),
			'amount':$('#deposit-amount').val()
		});
		this.collection.add(model);
		model.save();
	},
	sortDeposit:function(ev){
		var attribute = $(ev.currentTarget).data('attribute');
		this.collection.comparator = function(menuA,menuB){
			 if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
           	 return 0;
		}
		this.collection.sort();
		 this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
	},
	filterDeposit:function(ev){
		var name,from,to;
		name = this.$('#user-deposit').val();
		from = this.$('.find-from input').val();
		to = this.$('.find-to input').val();
		if(name=='') return;
		var result = _.filter(this.collection.toJSON(),function(model){
			if(from&&to) return (model.date>=from&&model.date<=to);
			if(name&&from&&to) return (model.username==name&&(model.date>=from&&model.date<=to));
			if(name) return model.username==name;			
		});
		//render view
		 this.$el.html(Templates['deposit/deposit']({
            deposit: result,'user':userCollection.toJSON()
        }));
		for (i in result){
			var model = result[i];
			this.$('tbody').append(
           this.subViews[model.id].el);
		}
		this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
	}
})