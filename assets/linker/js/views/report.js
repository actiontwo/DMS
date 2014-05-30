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
//          Show report cost meal
// Class:
//          
// Functions:
//          
// Called From:
//          (script) any
// Author:
//          Hien Lam (hienlt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Hien Lam - Init first revision.
// ============================================================================


var ReportView = Backbone.View.extend({
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
		this.listenTo(this.collection, 'sync reset', this.render);
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
//            render to template reportCostMeal.html
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Hien Lam
// -------------------------------------------------------------------
	render: function(){
		this.$el.html(Templates['report/reportCostMeal'] ({
			'report': this.collection.toJSON(),'user':userCollection.toJSON()
		}));
		var i=1;
		 $('tbody tr').find('td:first-child').each(function(){
		 	$(this).html(i);
		 	i++;
		 });
		 
		 var i;
		 var array = [];
		 for(i = 5; i <= 12; i++){
		 	var sum = 0;
		 	$('tbody tr').find('td:nth-child(' + i +')').each(function(){
			 		console.log($(this).text());
			 		sum += parseFloat($(this).text());
			  });
			  array.push(sum);
			};
			
			for(i = 2; i <= 9; i++){
				$('tbody tr:last-child').find('th:nth-child(' + i + ')').each(function(){
					$(this).html(array[i-2]);
				});
			}
	}
});
