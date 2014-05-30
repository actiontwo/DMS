// ============================================================================
// ,,,,,,,,, ,,,
// ,,,,,,,, ,,,  Copyright:
// ,,,     ,,,          This source is subject to the Designveloper JSC
// ,,,    ,,,           All using or modify must have permission from us.
// ,,,   ,,,            http://designveloper.com
// ,,,,,,,,
// ,,,,,,,       Name:  DSVScriptTemplate
//
// Purpose:
//          Show report expense
// Class:
//          one ; two ; three
// Functions:
//          one ; two ; three
// Called From:
//          (script) any
// Author:
//          Hien Lam (hienlt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Hien Lam - Init first revision.
// ============================================================================


var ReportExpenseView = Backbone.View.extend({
	tagName: 'div',
	id: 'report',
	className: 'menus',
	initialize: function(){
		//this.listenTo(this.collection, 'change', this.render);
		this.render();
	},
	render: function(){
		this.$el.html(Templates['report/reportExpense'] ({}));

	}
})