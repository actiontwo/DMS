//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create function jquery using in website 
// Class:
//          
// Functions:
//          init ; auto_index ; cleadForm ; show_popup; fillDish
//          selectDish ; getDish ; reselectDish; formatDate; displayCalendar
// Called From:
//          (script) views/main/index.handlebars
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init file, refactor code.
// ============================================================================
//

function init() {
    //$("#tabs").tabs();
  $('.close_popup,.btn-cancel').click(function() {
    $('.popup_area').hide();
    $('[class*="style_popup"]').hide();
  });
}
// -------------------------------------------------------------------
// auto_index (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            only using in deposit page
// PURPOSE:
//            increase serial number in deposit page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
function auto_index() {
  var i = 1;
  $('tbody').find('tr td:first-child').each(function() {
    $(this).html(i);
      i++;
  });
}
// -------------------------------------------------------------------
// cleadForm (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen init comment
// -------------------------------------------------------------------
function cleadForm() {
  var f = $('.find > .find-from > div').children('.datepicker').val("");
  var t = $('.find > .find-to > div').children('.datepicker').val("");
}
// -------------------------------------------------------------------
// show_popup (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            open pop up
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen init comment
// -------------------------------------------------------------------
function show_popup(name_popup) {
  $('[class*="style_popup"]').hide();
  $(name_popup).show();
  $('.popup_area').show();
}
// -------------------------------------------------------------------
// fillDish (ev,model  )
//
// PARAMETERS:
//            ev element, model: model using 
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            auto select
// NOTES:
//            none
// REVISIONS:
//            05/10/2014: ActionTwo init function
//            05/30/2014: Phuc Nguyen refactor code
// -------------------------------------------------------------------
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
// -------------------------------------------------------------------
// selectDish (tip,key )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            open pop up
// NOTES:
//            none
// REVISIONS:
//            05/10/2014: ActionTwo init function
//            05/30/2014: Phuc Nguyen refactor code 
// -------------------------------------------------------------------
function selectDish(tip, key) {
  var index = tip.find('li.focus').index(),
  temp = index,
  num_word = tip.find('li').length,
  next_word = this.reselectDish(tip, num_word, key, temp);
  tip.find('li').removeClass('focus');
  tip.find('li:eq(' + next_word + ')').addClass('focus');
};
// -------------------------------------------------------------------
// getDish (listDish, el)
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            open pop up
// NOTES:
//            none
// REVISIONS:
//            05/10/2014: ActionTwo init function
//            05/30/2014: Phuc Nguyen refactor code 
// -------------------------------------------------------------------
function getDish(listDish, el) {
  el.val(listDish.find('li.focus').html());
};
// -------------------------------------------------------------------
// reselectDish (tip,num_word,key,temp )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            open pop up
// NOTES:
//            none
// REVISIONS:
//            05/10/2014: ActionTwo init function
//            05/30/2014: Phuc Nguyen refactor code 
// -------------------------------------------------------------------
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
// -------------------------------------------------------------------
// formatDate()
//
// PARAMETERS:
//            no
// RETURNS:
//            date current with format 
// DEPENDENCIES:
//            
// PURPOSE:
//            format date type
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen init function  
// -------------------------------------------------------------------
function formatDate(){
  var date = new Date();
  var month= date.getMonth()+1;
  var dates = date.getDate();
  var year = date.getFullYear();
  return '0'+month+'/'+dates+'/'+year;
}
// -------------------------------------------------------------------
// displayCalendar ()
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            
// PURPOSE:
//            display calendar 
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen init code 
// -------------------------------------------------------------------
function displayCalendar(){
  this.$('.datepicker').datepicker({
    showOn: "button",
    buttonImage: "images/calendar.png",
    buttonImageOnly: true,
  });
}