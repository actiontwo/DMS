
//view menu
var MenuView = Backbone.View.extend({
	template : null,
	initialize: function () {
		$.get('linker/templates/menu/view_menu.html', this.setTemplate.bind(this))
	},
	setTemplate: function(templateString) {
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		console.log(this.template(this.model.attributes));
		this.$el.html(this.template(this.model.attributes[0]));
		return this;
	}
	
});

//popup dish
var PopupDishView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/popup_dish.html',this.setTemplate.bind(this))
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

//popup menu
var PopupMenuView = Backbone.View.extend({
	template:null,
	name:'Bye',
	initialize:function(){
		$.get('linker/templates/menu/popup_menu.html',this.setTemplate.bind(this))
	},
	setTemplate:function(templateString){
		this.$el.html(templateString);
	},
	// events:{
	// 	'click #btn-save': 'save'
	// },
	// save:function(){
	// 	console.debug(this.model);
	// 	//var model 	= this.model.toJSON();
	// 	var date  	= $('.date').val();
	// 	var brunch 	= $('.brunch').val(); 
	// 	var dish1 	= $('.dish1').val(); 
	// 	var dish2 	= $('.dish2').val(); 
	// 	var dish3 	= $('.dish3').val(); 
	// 	var dish4 	= $('.dish4').val(); 
	// 	var dish5 	= $('.dish5').val(); 
	// 	var note 	= $('.note').val();

	// 	var menu = new MenuModel();
	// 	menu.save({
	// 		no:'9',
	// 		date:date,
	// 		brunch:brunch,
	// 		dish1:dish1,
	// 		dish2:dish2,
	// 		dish3:dish3,
	// 		dish4:dish4,
	// 		dish5:dish5,
	// 		note:note
	// 	});
	// 	this.model = menu;
	// 	menu.isNew();
	// 	return false;
	// }
});

//suggestion
var SuggestionView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/view_suggestion.html',this.setTemplate.bind(this))
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var PopupPrintView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/print_menu.html',this.setTemplate.bind(this))
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
	},
	render:function(){
		this.$el.html(this.template(this.model.attributes));
		init();
		return this;
	}
});