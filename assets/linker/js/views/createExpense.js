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
    removeARow: function(ev){
        var toBeRemoved = $(ev.currentTarget).parent().parent();
        toBeRemoved.remove();
    },
    backToExpenseView: function(){
    	this.remove();
        var expenseMenuView_new = new ExpenseMenuView({collection: this.collection});
        $("#main").html(expenseMenuView_new.el);
        expenseMenuView_new.render();
    }

});