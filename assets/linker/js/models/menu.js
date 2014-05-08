var MenuModel = Backbone.Model.extend({
	url:function(){
		url = '/menu';
		url+= this.getQuery();
		return url; 
	},
	getQuery:function(){
		if(this.param)
			return this.param;
		else
			return '';
	},
	setParam:function(param){
		this.param = param;
	}
})
var PrintModel = Backbone.Model.extend({
	url:'/menu'
})
var ListDish = Backbone.Model.extend({
	//urlRoot:'/listdish'
})
var dishCollection = Backbone.Collection.extend({
	model: ListDish,
	url: function(){
		url = '/listdish';
		url+= this.getQuery();
		return url;
	},
	getQuery: function(){
		if(this.param)
			return this.param;
		else
			return '';
	},
	setParam: function(param){
		this.param = param;
	}
})
var Suggestion = Backbone.Model.extend({
	url:'/suggestion'
})
var CreateMenu = Backbone.Model.extend({
	
})
