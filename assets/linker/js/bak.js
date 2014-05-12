function init(){
    $('#btn-add').click(function(){
        add();
        $('.datepicker').datepicker({      
        showOn: "button",
        buttonImage: "images/calendar.png",
        buttonImageOnly: true,
    });
    });

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
function add(){
    //
    //
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var node=document.createTextNode(incr());
    th1.appendChild(node);
    tr.appendChild(th1);
    //
    var input = document.createElement("input");
    input.setAttribute("class","datepicker");
    input.setAttribute("type","text");
    var div = document.createElement("div");
    div.appendChild(input);     
    var th2 = document.createElement("th");
    th2.setAttribute("class","mn-cr-edit");
    th2.appendChild(div);
    tr.appendChild(th2);
    for(var i=1;i<8;i++){

        var input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("placeholder","Nhap Mon");
        var div = document.createElement("div");
        div.appendChild(input);     
        var th2 = document.createElement("th");
        th2.setAttribute("class","mn-cr-edit");
        th2.appendChild(div);
        tr.appendChild(th2);
    }
    var tbody = document.getElementById("create-menu");
    tbody.appendChild(tr);
}

function cleadForm () {
    var f=$('.find > .find-from > div').children('.datepicker').val("");
        var t=$('.find > .find-to > div').children('.datepicker').val("");
}

function show_popup(name_popup) {
    $('[class*="style_popup"]').hide();
    $(name_popup).show();
    $('.popup_area').show();
}