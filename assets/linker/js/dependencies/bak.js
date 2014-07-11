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
//
function initDatePicker(el) {
  el.datepicker();
}
function autoComplete(el, source) {
  el.autocomplete({
    source: source
  })
}
Handlebars.registerHelper('role', function (role) {
  return (role == 'admin')
    ? 'selected'
    : '';
});
Handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

function validateDate(el){
  var date = $(el).val();
  var dateArray = date.match(/([0-9])/g);
  var checkflg =true;
  if (dateArray.length >= 8) {
    var monthNum = parseInt(dateArray[0] + dateArray[1]);
    var dateNum = parseInt(dateArray[2] + dateArray[3]);
    var yearNum = parseInt(dateArray[4] + dateArray[5] + dateArray[6] + dateArray[7]);
    if ((monthNum == 0) || (monthNum > 12))
      checkflg = false;
    else {
      if (dateNum == 0) checkflg = false;
      if (monthNum == 2) {
        if ((yearNum % 4) == 0) {
          if (dateNum > 29) checkflg = false;
        } else if (dateNum > 28) checkflg = false;
      }
      var month30 = [1, 3, 5, 7, 8, 10, 12];
      if (month30.indexOf(monthNum) == -1) {
        if (dateNum > 30) checkflg = false;
      } else if (dateNum > 31) checkflg = false;
    }
  } else checkflg =false;
  if (!checkflg){
    alert('wrong date format');
    $(el).val('');
    return;
  }
  var month = dateArray[0]+dateArray[1];
  var date  = dateArray[2]+dateArray[3];
  var year  = dateArray[4]+dateArray[5]+dateArray[6]+dateArray[7];
  $(el).val(month+'/'+date+'/'+year);
}
