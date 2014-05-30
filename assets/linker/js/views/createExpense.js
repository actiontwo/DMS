// =============================================================================
// ,,,,,,,,, ,,,
// ,,,,,,,, ,,,  Copyright:
// ,,,     ,,,          This source is subject to the Designveloper JSC
// ,,,    ,,,           All using or modify must have permission from us.
// ,,,   ,,,            http://designveloper.com
// ,,,,,,,,
// ,,,,,,,       Name:  DSVScriptTemplate
//
// Purpose:
//          Declare CreateExpenseView
// Class:
//          CreateExpenseView
// Functions:
//          initialize; render; addARow; saveAllNewExpenses;
//          removeARow; backToExpenseView
// Called From:
//          (script) assets/linker/js/routes.js
//          (script) assets/linker/js/views/expenseMenu.js
// Author:
//          Son Le (sontl@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Son Le - Added DSV code style.
// =============================================================================
var CreateExpenseView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'create_expense',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
		this.render();
	},
	render: function() {
		this.$el.html(Templates['expense/create_expense']({}));
				init();
				//display calendar
				this.$('.datepicker').datepicker({
						showOn: "button",
						buttonImage: "images/calendar.png",
						buttonImageOnly: true,
				});
	},
	events: {
		'click [id="btnAddCreateExpense"]' : 'addARow',
				'click [id="btnSaveCreateExpense"]' : 'saveAllNewExpenses',
				'click [id="btnRemoveCreateExpense"]' : 'removeARow',
				'click [id="btnCancelCreateExpense"]' : 'backToExpenseView'
	},
		// -------------------------------------------------------------------
		// addARow ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Add one more Expense row to the current table
		//						Trigger when user click the 'Add' button
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		addARow: function(){
				var blankTH = $('#tbodyCreateExpense').find('tr')[1].outerHTML;
				$('#tbodyCreateExpense').append(blankTH);
				//display calendar
				this.$('.datepicker').datepicker({
						showOn: "button",
						buttonImage: "images/calendar.png",
						buttonImageOnly: true,
				});
		},
		// -------------------------------------------------------------------
		// saveAllNewExpenses ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Save all the new expense(s) to the current
		//						Expense Menu Collection
		//						Trigger when user click the 'Save' button
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		saveAllNewExpenses: function(){
				var tempModel;
				var count = 0;
				var thisCollection = this.collection;
				$('#tbodyCreateExpense tr.dataTR').each(function(){
						count++;
						tempModel = new ExpenseMenuModel();
						$(this).find('th').each(function(){
								if($(this).attr('class')=="es-cr-edit")
										tempModel.set($(this).data('attribute'), $(this).find('input').val());
						});
						thisCollection.create(tempModel);
				});
				alert(count + " item(s) added succesfully !");
		},
		// -------------------------------------------------------------------
		// removeARow ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Remove the current row from the current table
		//						Trigger when user click the Detele icon
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		removeARow: function(ev){
				var toBeRemoved = $(ev.currentTarget).parent().parent();
				toBeRemoved.remove();
		},
		// -------------------------------------------------------------------
		// backToExpenseView ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Navigate back to the Expense Menu view
		//						Trigger when user click the 'Cancel' button
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------		
		backToExpenseView: function(){
			this.remove();
				var expenseMenuView_new = new ExpenseMenuView({collection: this.collection});
				$("#main").html(expenseMenuView_new.el);
				expenseMenuView_new.render();
		}

});