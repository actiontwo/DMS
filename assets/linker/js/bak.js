function init() {
    //$("#tabs").tabs();

    $('.close_popup,.btn-cancel').click(function() {
        $('.popup_area').hide();
        $('[class*="style_popup"]').hide();
    });
}
var incr = (function() {
    var i = 2;

    return function() {
        return i++;
    }
})();

function auto_index() {
    var i = 1;
    $('tbody').find('tr td:first-child').each(function() {
        $(this).html(i);
        i++;
    });
}

function cleadForm() {
    var f = $('.find > .find-from > div').children('.datepicker').val("");
    var t = $('.find > .find-to > div').children('.datepicker').val("");
}

function show_popup(name_popup) {
    $('[class*="style_popup"]').hide();
    $(name_popup).show();
    $('.popup_area').show();
}

function fillDish(ev, model) {
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
        model.updateModel(ev);
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
};

function selectDish(tip, key) {
    var index = tip.find('li.focus').index(),
        temp = index,
        num_word = tip.find('li').length,
        next_word = this.reselectDish(tip, num_word, key, temp);
    tip.find('li').removeClass('focus');
    tip.find('li:eq(' + next_word + ')').addClass('focus');
};

function getDish(listDish, el) {
    el.val(listDish.find('li.focus').html());
};

function reselectDish(tip, num_word, key, temp) {
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
};
function formatDate(){
    var date = new Date();
    var month= date.getMonth()+1;
    var dates = date.getDate();
    var year = date.getFullYear();
    return '0'+month+'/'+dates+'/'+year;
}
function displayCalendar(){
    this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
}