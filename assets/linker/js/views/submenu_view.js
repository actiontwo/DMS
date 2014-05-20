var SubMenuView = Backbone.View.extend({
	initialize:function(){
		this.listenTo(this.model ,'sync', this.render);
	},
    render: function() {
        this.$el.html(Templates['menu/submenu_view'](this.model.attributes));
        //display calendar
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
        //when user click edit icon all element in row convert input or select
        //if date value is empty, view render input and select, else view render tag td and text inside
    	
        var date = this.model.get('date');          //get date value before set it empty
    	var brunch = this.model.get('brunch');      //get brunch value 
    	this.model.set({'date':''});                //set date value is empty
    	this.render();                              // render view 
    	this.model.set({'date':date});              //update date value in model
    	this.$('.date').val(date);                  //update html display date
    	this.$('.brunch').val(brunch);              //update html display brunch
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