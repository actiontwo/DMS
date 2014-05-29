var ExpenseMenuView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'expense_menu',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
        this.collection.sort_order = {
            date: 1,
            money: 1,
            invoiceID: 1,
            invoiceImage: 1,
            note: 1
        };
	},
	render: function() {
		this.$el.html(Templates['expense/expense_menu']({
			expense: this.collection.toJSON()
		}));
        init();
        //display calendar
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
	},
	events: {
        'click [id^="edit-expense"]': 'editExpense',
        'click [id^="save-expense"]': 'saveExpense',
        'click [id^="th_"]': 'sortExpense',
        'click [id^="delete-expense"]': 'deleteExpense',
        'click [id="btnDeleteOK"]' : 'deleteByCheckbox',
        'click [class="checkAll"]' : 'checkAll',
        'click [class="uncheckAll"]' : 'uncheckAll',
        'click [id="btnViewByDay"]' : 'viewByDay',
        'click [id="btn-create-expense"]': "openCreateExpenseView"

    },
    editExpense: function(ev){
    	// change current values fields into text fields
        $(ev.currentTarget).removeClass('iconsp-edit-25px').addClass('iconsp-edit-red-25px');
        $(ev.currentTarget).parents('[id^=expenseTR_]').find('td').each(function(){
        	if (!$(this).find('[id^="edit-expense"]').length) {
        		if ($(this).data('attribute'))
                {
                    var text = $(this).html();
                    if ($(this).data('attribute')=="date")
                    {   
                        $(this).html('<input type="text" value="' + text + '"> ');
                        // $(this).find('input').addClass("datepicker").addClass("hasDatepicker");
                        // $(this).append('<img class="ui-datepicker-trigger" src="images/calendar.png" alt="..." title="...">');
                    }
                        
                    else
                        $(this).html('<input type="text" value="' + text + '">');
                }
        	}            
        })

        // change edit icon to save icon		
        $(ev.currentTarget).attr('id', function() {
            return $(this).attr('id').replace('edit', 'save');
        });
        // bind save event to the button
        this.delegateEvents();
	},
    saveExpense: function(ev) {
        var id = $(ev.currentTarget).data('id');
        var model = this.collection.get(id);
        // go through each attributes and update the model
        $(ev.currentTarget).parents('[id^=expenseTR_]').find('td').each(function() {
            if ($(this).find('input').length) {
                model.set($(this).data('attribute'), $(this).find('input').val());
            }
        });
        model.save();
        // change save icon to edit icon,
        $(ev.currentTarget).attr('id', function() {
            return $(this).attr('id').replace('edit', 'save');
        });
        $(ev.currentTarget).removeClass('iconsp-edit-red-25px').addClass('iconsp-edit-25px');
        // bind edit event to the button
        this.render();
    },
    sortExpense: function(ev) {
        var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    },
    deleteExpense: function(ev){
        var id = $(ev.currentTarget).data('id');
        $(ev.currentTarget).removeClass('iconsp-remove-25px').addClass('iconsp-remove-red-25px');

        // get user's confirmation before deleting model
        var cf = confirm("Are you sure you want to delete this expense ?");
            // if they press the OK button
        if (cf==true)
        {
            var model = this.collection.get(id);
            // call Backbone.Model.destroy() to remove model from collection as well as the server
            model.destroy();
        }

        // show_popup('.es-delete');
        // if ($('#btnDeleteOK').clicked == true){
        //     var model = this.collection.get(id);
        //     model.destroy();
        // }

        $(ev.currentTarget).removeClass('iconsp-remove-red-25px').addClass('iconsp-remove-25px');
    },
    deleteByCheckbox: function(){
        var thisCollection = this.collection;
        $('tbody').find('[id^=cbox_]').each(function(){
            if ($(this).find('input').prop('checked') == true) {
                var id = $(this).data('id');
                var model = thisCollection.get(id);
                model.destroy();
            }
        });
        $('.popup_area').hide();
        $('[class*="style_popup"]').hide();
    },
    checkAll: function(){
        $('tbody').find('[id^=cbox_]').each(function(){
            $(this).find('input').prop('checked', true);
        });
        $('.checkAll').removeClass('checkAll').addClass('uncheckAll');
    },
    uncheckAll: function(){
        $('tbody').find('[id^=cbox_]').each(function(){
            $(this).find('input').prop('checked', false);
        });
        $('.uncheckAll').removeClass('uncheckAll').addClass('checkAll');
    },
    viewByDay: function(){
        var dateFromString = ($('.find .find-from').find('input').val());
        dateFrom = new Date(dateFromString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var dateToString = ($('.find .find-to').find('input').val());
        dateTo = new Date(dateToString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        console.log('dateFrom :' + dateFrom);
        console.log('dateTo :' + dateTo);
        var tempCollection = new ExpenseMenuCollection();
        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            //console.log(tempDay);
            if(tempDay > dateFrom && tempDay < dateTo)
            {
                tempCollection.add(modelIn);
            }
        });

        this.$el.html(Templates['expense/expense_menu']({
            expense: tempCollection.toJSON()
        }));
        init();
        $('.find .find-from').find('input').val(dateFromString);
        $('.find .find-to').find('input').val(dateToString);
    },
    openCreateExpenseView: function(){
        this.remove();
        var createExpenseView_new = new CreateExpenseView({collection: this.collection});
        $("#main").html(createExpenseView_new.el);
        //createExpenseView_new.render();
    }
});