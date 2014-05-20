var DepositView = Backbone.View.extend({
	tagName:'div',
	className:'deposit',
	id:'deposit',
	subViews:{},
	initialize:function(){
		this.render();
		this.listenTo(this.collection, 'sync reset sort remove',this.render );
		//default sort with 1 increase and -1 decrease
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
        auto_index();//index table
        return this;
	},
	events:{
		'click #btn-create-deposit': 'createDeposit',	
		'click th':'sortDeposit',
		'change #user-deposit':'filterDeposit1',
		'click .confirm':'filterDeposit',
		'click #btn-delete-selected':'deleteSelected'
	},
	createDeposit:function(){
		var model = new DepositModel;				//create new model Deposit
		model.set({
			'date':$('#date').val(),				//set date model equal date user input
			'username':$('#deposit-new-user').val(),//set username model equal username user input 
			'amount':$('#deposit-amount').val()		//set amount model equal amount user input 
		});											//get input from user
		this.collection.add(model);					//add model in collection
		model.save();								//save model in database
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
	deleteSelected:function(){
		that =this;						//assign that equal this, using in each loop
		//loop though tbody get all td second
		this.$el.find('tbody tr td:nth-child(2) input').each(function(){
			//check if checked then delete 
			if($(this).prop('checked')){		
				var id=$(this).data('id');					//get id of model
				var model = that.collection.get(id);		//get model from collection with id have above
				that.collection.remove(model);				//remove model out collection
				model.destroy();							//end destroy model from database
			}
		});
	},
	filterDeposit:function(ev){
		var name,from,to;							//declare var name,date-from,date-to using filter
		name = this.$('#user-deposit').val();		//get name value filter with name 
		from = this.$('.find-from input').val();	//get date from filter with date
		to = this.$('.find-to input').val();		//get date to filter with date
		//using _.filter function  in undercore.js to filter data, all model accord condition stored result`
		var result = _.filter(this.collection.toJSON(),function(model){
			if(from&&to) return (model.date>=from&&model.date<=to);									//return model have from <= model.date <= to
			if(name&&from&&to) return (model.username==name&&(model.date>=from&&model.date<=to));	//return model accord condition 
			if(name) return model.username==name;													//return model accord condition username equal name user input			
		});
		//after filter,render view with result found
		 this.$el.html(Templates['deposit/deposit']({
            deposit: result,'user':userCollection.toJSON()
        }));
		 //render subview 
		for (i in result){
			var model = result[i];
			this.$('tbody').append(
           this.subViews[model.id].el);
		}
		//after render, display again calendar
		this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
	}
})