
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
		this.$el.html(this.template(this.model.attributes[0]));
		init();
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
		return this;
	}
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
		this.$el.html(this.template(this.model.attributes[0]));
		return this;
	}
});

var PopupPrintView = Backbone.View.extend({
	template:null,
	initialize:function(){
		$.get('linker/templates/menu/print_menu.html',this.setTemplate.bind(this));
		console.log('Begin get template');
	},
	setTemplate:function(templateString){
		this.template = Handlebars.compile(templateString);
			console.log('handlebars compile template');
	},
	render:function(){
		console.log('Render',this.model.attributes[0]);
		console.log(this.template());
		this.$el.html(this.template(this.model.attributes[0]));
		
		return this;
	}
});