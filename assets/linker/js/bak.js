function init(){
    $('.datepicker').datepicker({      
        showOn: "button",
        buttonImage: "images/calendar.png",
        buttonImageOnly: true,
    });

    $("#tabs").tabs();

    $('.close_popup,.btn-cancel').click(function() {
        $('.popup_area').hide();
        $('[class*="style_popup"]').hide();
    });
}
 var incr = (function () {
    var i = 2;

    return function () {
        return i++;
    }
    })();


function cleadForm () {
    var f=$('.find > .find-from > div').children('.datepicker').val("");
        var t=$('.find > .find-to > div').children('.datepicker').val("");
}

function show_popup(name_popup) {
    $('[class*="style_popup"]').hide();
    $(name_popup).show();
    $('.popup_area').show();
}
