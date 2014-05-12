var CreateMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'mn-create-menu',
    id: 'create_menu',
    initialize: function() {
    	this.render();
        //this.listenTo(this.collection, 'sync reset sort', this.render);

    },
    render: function() {
        this.$el.html(Templates['menu/create_menu']());    
    },
    events:{
    	'click #btn-add'	: 'Add',
    	'click #btn-save'	:'Save',
    },
    Add:function(){
    	$('#create_menu_1').clone().appendTo('tbody');
    	//$('tbody').append(tr);
    },
    Save:function(){

    },
});