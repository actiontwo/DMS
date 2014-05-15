var CreateDishView = Backbone.View.extend({
    render: function() {
        this.$el.html(Templates['menu/dish_menu'](this.model.attributes));
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this.el;
    },
    events: {
        'change input, select': 'updateModel',
        'keyup  input.dish, select': 'filtDish'
    },
    updateModel: function(ev) {
        this.model.set($(ev.currentTarget).data('attribute'), $(ev.currentTarget).val());
    },
    filtDish: function(ev) {
        $('#list_dish_menu').show().appendTo($(ev.currentTarget).parent());
        var key = ev.keyCode,
            keyWord = $(ev.currentTarget).val(),
            listDish = $('#list_dish_menu');
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

    }

})