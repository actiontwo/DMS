var SubMenuView = Backbone.View.extend({
	initialize:function(){
		this.listenTo(this.model ,'change,this', this.render);
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
        'keyup  input.dish, select': 'fillDish'
    },
    editMenu: function() {
    	var date=this.model.get('date');
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
    fillDish: function(ev) {
        $('#list_dish_menu').show().appendTo($(ev.currentTarget).parent());
        var key = ev.keyCode,
            keyWord = $(ev.currentTarget).val(),
            listDish = $('#list_dish_menu');
            console.log(key);
        if (key == 9) {
            $('#list_dish_menu').hide();
        }
        if (key == 38 || key == 40) {
            switch (key) {
                case 38:
                    this.selectDish(listDish, "-");
                    break;
                case 40:
                    this.selectDish(listDish, "+");
                    break;
            }

        } else if (key == 37 || key == 39 || key == 13) {
            this.getDish(listDish, $(ev.currentTarget));
            this.updateModel(ev);
        } else {
            var index = -1;
            $(listDish).find('li').each(function() {
                if ($(this).html().toLowerCase().indexOf(keyWord.toLowerCase()) != -1) {
                    $(this).show().addClass('show').removeClass('hide');
                    if (index == -1) {
                        index = $(this).index();
                    }
                } else {
                    $(this).hide().addClass('hide').removeClass('show');
                }
            });
            if (index == -1) {
                listDish.hide();
            } else {
                $(listDish).find('li').removeClass('focus');
                $(listDish).find('li:eq(' + index + ')').addClass('focus');
            }
        }
    },
    selectDish: function(tip, key) {
        var index = tip.find('li.focus').index(),
            temp = index,
            num_word = tip.find('li').length,
            next_word = this.reselectDish(tip, num_word, key, temp);
        tip.find('li').removeClass('focus');
        tip.find('li:eq(' + next_word + ')').addClass('focus');
    },
    getDish: function(listDish, el) {
        el.val(listDish.find('li.focus').html());
    },
    reselectDish: function(tip, num_word, key, temp) {
        switch (key) {
            case "+":
                temp++;
                break;
            case "-":
                temp--;
                break;
        }
        var next_word = temp % num_word;
        if (tip.find('li:eq(' + next_word + ')').hasClass('hide')) {
            next_word = this.reselectDish(tip, num_word, key, next_word);
        }
        return next_word;
    },
});