
//view menu
var MenuView = Backbone.View.extend({
	template : null,
	initialize: function () {
		$.get('linker/templates/menu/view_menu.html', this.setTemplate.bind(this))
		this.listenTo(this.model, 'change', this.render);
	},
	setTemplate: function(templateString) {
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		if(this.template != null){
			this.$el.html(this.template(this.model.attributes));
			return this;	
		}
		
	}
	
});

//popup dish
var PopupDishView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/popup_dish.html',this.setTemplate.bind(this));
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.collection, "change sync", this.render);				
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		if(this.template != null){
			this.$el.html(this.template(this.collection.models[0].attributes));
			
			show_popup('.mn-create-dish')
			return this;	
		}
		
	},

	//declare events 
	events:{
		"click #btn-save": "create" //create a dish
	},
	create:function(){
		this.collection.add(this.model);
		if(this.model.isNew()){
			this.collection.setParam('/create')
		}
		var dish = $('#dishname').val();
		this.model.set('dish', dish);
		var onSaveSuccess = function(){
			
		}

		this.model.save(null, {success: function () {
    //     		Dishs.reset();
				// createNewDish();	
    		}
		});
		
		//console.log(Pop);
		// this.model = Pop;
		// this.model.save();
	}
});

//popup menu
var PopupMenuView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/popup_menu.html',this.setTemplate.bind(this));
		this.listenTo(this.model, 'change', this.render);
	},
	setTemplate:function(templateString){
		this.$el.html(templateString);
		return this;
	}
});

//suggestion
var SuggestionView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/view_suggestion.html',this.setTemplate.bind(this));
		this.listenTo(this.model, 'change', this.render);
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		if(this.template != null){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
	}
});

//view print menu
var PopupPrintView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/print_menu.html',this.setTemplate.bind(this));
		this.listenTo(this.model, 'change', this.render);
		console.log('Begin get template');
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		if(this.template != null){
			this.$el.html(this.template(this.model.attributes));
		
			return this;	
		}
		
	}
});
//create a new menu
var PopupCreateMenuView= Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/popup_menu.html',this.setTemplate.bind(this));
	},
	setTemplate:function(templateString){
		this.$el.html(templateString);
		init();
	},
	events:{
		'click #btn-save':"add"
	},
	add:function()
	{
		console.log('AAAa');
		this.model.setParam('/create');
		this.model.set({
			no:10,
			date:'2/24/2014',
			bruch:'lunch',
			dish1:'ca',
			dish2:'ca',
			dish3:'ca',
			dish4:'ca',
			dish5:'ca',
			note:'noo',
		});
		this.model.save();
	}
	
});