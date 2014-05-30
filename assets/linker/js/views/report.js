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
	initialize: function(){
		this.listenTo(this.collection, 'sync reset', this.render);
	},
	render: function(){
		this.$el.html(Templates['report/reportCostMeal'] ({
			'report': this.collection.toJSON(),'user':userCollection.toJSON()
		}));

	}
})