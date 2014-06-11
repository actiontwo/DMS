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
  el.datepicker({
    showOn: "button",
    buttonImage: "images/calendar.png",
    buttonImageOnly: true
  });
}
