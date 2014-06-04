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

// -------------------------------------------------------------------
// initialize function:
//
// PARAMETERS:
//            
// RETURNS:
//           
// DEPENDENCIES:
//            
// PURPOSE:
//            perform render when collection sysn reset
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: HienLam
// -------------------------------------------------------------------
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render);
	//	this.render();
	},
// -------------------------------------------------------------------
// render function:
//
// PARAMETERS:
//            
// RETURNS:
//           
// DEPENDENCIES:
//            
// PURPOSE:
//            render to template reportExpense.html
//						total money
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Hien Lam
// -------------------------------------------------------------------
	render: function(){
		this.$el.html(Templates['report/reportExpense'] ({
			'reportexpense': this.collection.toJSON()
		}));
		var i=1;
		$('tbody tr').find('td:first-child').each(function(){
			$(this).html(i);
			i++;
		});
		var sum=0;
		$('tbody tr').find('td:nth-child(3)').each(function(){
			$(this).text();
			sum += parseFloat($(this).text());
		});console.log(sum);
		$('tbody tr:last-child').find('th:nth-child(2)').html(sum);
	}
})