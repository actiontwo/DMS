$(document).ready(function() {

    //$('body').on('load',function(){

    ajax_load_meal();
    //});

    $('.datepicker').datepicker({
        showOn: "button",
        buttonImage: "images/calendar.png",
        buttonImageOnly: true
    });

    $("#tabs").tabs();

    $('.close_popup,.btn-cancel').click(function() {
        $('.popup_area').hide();
        $('[class*="style_popup"]').hide();
    });




    $('.confirm').on('click',function(evt) {
        evt.preventDefault();
        //var a=$('.find-from').children('.datepicker').val();
        var f=$('.find > .find-from > div').children('.datepicker').val();
        var t=$('.find > .find-to > div').children('.datepicker').val();
        $.ajax({
            "type": "post",
            "url" : 'find_meal',
            "data": 'from=' +f + '&to='+ t,
            "async": true,
            "success":function(kq){
                console.log(kq)
                $('#table-meal').html(kq);
                // if (kq.alert!='Success') {
                //     alert('Khong tin thay du lieu');
                // }else{
                   
                // }
                
            }
        });
        return false;
    });

});

function cleadForm () {
    var f=$('.find > .find-from > div').children('.datepicker').val("");
        var t=$('.find > .find-to > div').children('.datepicker').val("");
}

function reloadPage () {
    $("#reload").load(baseUrl+"register_meal/find_meal");
}

function show_popup(name_popup) {
    $('[class*="style_popup"]').hide();
    $(name_popup).show();
    $('.popup_area').show();
}

function ajax_load_meal(){
    
        //var a=$('.find-from').children('.datepicker').val();
        var f=$('.find > .find-from > div').children('.datepicker').val();
        var t=$('.find > .find-to > div').children('.datepicker').val();
        $.ajax({
            "type": "post",
            "url" : 'find_meal',
            "data": 'from=' +f + '&to='+ t,
            "async": true,
            "success":function(kq){
                console.log(kq)
                $('#table-meal').html(kq);
                // if (kq.alert!='Success') {
                //     alert('Khong tin thay du lieu');
                // }else{
                   
                // }
                
            }
        });
       
}
