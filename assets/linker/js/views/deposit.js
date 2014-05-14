var DepositView = Backbone.View.extend({
	tagName:'div',
	className:'deposit',
	id:'deposit',
	initialize:function(){
		this.render();
		this.listenTo(this.collection, 'sync reset sort',this.render );
	},
	render:function(){
		this.$el.html(Templates['deposit/deposit']({'deposit':this.collection.toJSON()}));
		
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
	}
})