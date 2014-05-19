var SubMenuView = Backbone.View.extend({
	initialize:function(){
		this.listenTo(this.model ,'sync', this.render);
	},
    render: function() {
        this.$el.html(Templates['menu/submenu_view'](this.model.attributes));
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this.el;
    },
    events:{
    	'click #button-edit-menu' : 'editMenu',
    	'click #button-save-menu': 'saveMenu',
    	'click #button-remove-menu':'removeMenu',
    	'change input, select': 'updateModel',
        'keyup  input.dish, select': 'FillDish'
    },
    editMenu: function() {
    	var date = this.model.get('date');
    	var brunch = this.model.get('brunch');
    	this.model.set({'date':''});
    	this.render();
    	this.model.set({'date':date});
    	this.$('.date').val(date);
    	this.$('.brunch').val(brunch);
    },
    removeMenu:function(){
    	this.model.destroy();
    },
    saveMenu:function(){ 
    	$('#list_dish_menu').appendTo('.table').css('display','none');//fix function fillDish working correct  	   	
    	this.model.save();
    	this.render();
    },
    updateModel: function(ev) {
    	this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
    },
    FillDish:function(ev){
        fillDish(ev,this);
    }
  
});