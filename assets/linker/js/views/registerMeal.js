var RegisterMealView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'register_meal',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
        this.collection.sort_order = {
            date: 1,
            name: 1,
            lunch: 1,
            dinner: 1,
            updateBy: 1
        };
	},
    events: {
        'click [id^="th_"]': 'sortRegisterMeals',
        'click [id^="edit-registerMeal"]':'editRegisterMeal',
        'click [id^="save-registerMeal"]': 'saveRegisterMeal',
        'click [id="btnViewByDay"]' : 'viewByDay',
        'click [id="btnViewMealRegistration"]' : 'viewMealRegistration',
        'click [id="btnDeleteAll"]' : 'deleteAllItems',
        'click [id="btnShowAll"]' : 'showAllItems',
        'click [id="btnSaveAll"]' : 'saveAllItems',
        'click [id="btnEditAll"]' : 'editAllItems'
    },
    getCurrentMonth: function(){
        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var n = month[d.getMonth()].toUpperCase();
        return n;
    },
    initRegisterMeal: function(){
        var currentDay = new Date();
        var currentMonth = currentDay.getMonth()+1;
        var currentYear = currentDay.getFullYear();
        var dayCount = this.getDaysInMonth(currentMonth, currentYear);
        var thisCollection = this.collection;
        var i=1;
        var already = 0;
        //var models = new Array();
        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            var modelMonth = tempDay.getMonth()+1;
            var modelYear= tempDay.getFullYear();
            if (modelMonth == currentMonth && modelYear == currentYear) already = 1;
        });
        if (already == 0 )
        {
            //console.log("already = 0");
            for (i=1; i<=dayCount; i++)
            {
                var tempModel;
                tempModel = new RegisterMealModel;
                var d = new Date(currentYear, currentMonth - 1, i);
                d = this.getDayString(d);
                tempModel.set("date", d);
                tempModel.set("lunch", false);
                tempModel.set("dinner", false);
                tempModel.set("name", "this username");
                thisCollection.create(tempModel);

            }
        }
        else if (already == 1)
        {
            //console.log("already = 1");
        }
    },
    getDaysInMonth: function(month,year){
        return new Date(year, month, 0).getDate();
    },
    getDayString: function(_date){
        var month = _date.getMonth()+1;
        if (month.toString().length==1) month = "0" + month;
        var date = _date.getDate();
        if (date.toString().length==1) date = "0" + date;
        return month + "/" + date + "/" + _date.getFullYear();
    },
    getDaysInWeek: function(_currentDay, _currentMonth, _currentYear)
    {
        var d = new Date(_currentYear, _currentMonth - 1, _currentDay);
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var n = weekday[d.getDay()];
        return n.substring(0,3);
    },
	render: function() {

        //display all days in current month
        this.initRegisterMeal();

        // display only days of this month
        var currentDay = new Date();
        var currentMonth = currentDay.getMonth()+1;
        var currentYear = currentDay.getFullYear();
        var tempCollection = new RegisterMealCollection();

        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            var modelMonth = tempDay.getMonth()+1;
            var modelYear= tempDay.getFullYear();
            if (modelMonth == currentMonth && modelYear == currentYear) tempCollection.add(modelIn);
        });

		this.$el.html(Templates['registerMeal/registerMeal']({
			//registerMeals: this.collection.toJSON()
            registerMeals: tempCollection.toJSON()
		}));
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.registerMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });
        init();
        //display calendar
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        //display current month
        $('#h1MonthInfo').html(this.getCurrentMonth());

	},
    sortRegisterMeals: function(ev) {
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
    editRegisterMeal: function(ev){
        var id = $(ev.currentTarget).data('id');
        // change current values fields into text fields
        $(ev.currentTarget).removeClass('iconsp-edit-25px').addClass('iconsp-edit-red-25px');
        $(ev.currentTarget).parents('[id^=registerMealTR_]').find('td').each(function(){
            if (!$(this).find('[id^="edit-registerMeal"]').length) {
                if ($(this).data('attribute'))
                {
                    var text = $(this).html();
                    if ($(this).data('attribute')=="lunch" || $(this).data('attribute')=="dinner")
                    {   
                        var isChecked = $(this).find('input').is(':checked');
                        //console.log(isChecked);
                        if (isChecked)
                            $(this).html('<input type="checkbox" checked>');
                        else
                            $(this).html('<input type="checkbox">');
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
    saveRegisterMeal: function(ev){
        var id = $(ev.currentTarget).data('id');
        var model = this.collection.get(id);
        // go through each attributes and update the model
        $(ev.currentTarget).parents('[id^=registerMealTR]').find('td').each(function() {
            if ($(this).find('input').length) {
                if ($(this).data('attribute')=="lunch" || $(this).data('attribute')=="dinner")
                {
                    var isChecked = $(this).find('input').is(':checked');
                    if (isChecked){
                        model.set($(this).data('attribute'), true);
                    }
                    else{
                        model.set($(this).data('attribute'), false);
                    }
                }
                else model.set($(this).data('attribute'), $(this).find('input').val());
            }
        });
        model.save();
        // change save icon to edit icon,
        $(ev.currentTarget).attr('id', function() {
            return $(this).attr('id').replace('edit', 'save');
        });
        $(ev.currentTarget).removeClass('iconsp-edit-red-25px').addClass('iconsp-edit-25px');
        this.render();
    },
    viewByDay: function(){
        var dateFromString = ($('.find .find-from').find('input').val());
        dateFrom = new Date(dateFromString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var dateToString = ($('.find .find-to').find('input').val());
        dateTo = new Date(dateToString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        //console.log('dateFrom :' + dateFrom);
        //console.log('dateTo :' + dateTo);
        var tempCollection = new RegisterMealCollection();
        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            //console.log(tempDay);
            if(tempDay >= dateFrom && tempDay <= dateTo)
            {
                tempCollection.add(modelIn);
            }
        });

        this.$el.html(Templates['registerMeal/registerMeal']({
            registerMeals: tempCollection.toJSON()
        }));
        init();
        //display calendar
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        //display current month
        $('#h1MonthInfo').html(this.getCurrentMonth());

        // display no (number) collumn
        var count = 1;
        if (tempCollection.length == 0) count = 0;
        $('.registerMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });

        $('.find .find-from').find('input').val(dateFromString);
        $('.find .find-to').find('input').val(dateToString);
    },
    viewMealRegistration: function(){
        this.remove();
        var viewMealRegister_new = new ViewRegisterMealView({collection: this.collection});
        $("#main").html(viewMealRegister_new.el);
        viewMealRegister_new.render();
    },
    deleteAllItems: function(){
        var thisCollection = this.collection;
        var i = 1;
        thisCollection.each(function(modelIn){
            modelIn.destroy();
            console.log(i);
            i++;
        });
    },
    showAllItems: function(){
        $('#h1MonthInfo').html('SHOW ALL ITEMS');

        this.$el.html(Templates['registerMeal/registerMeal']({
            registerMeals: this.collection.toJSON()
            //registerMeals: tempCollection.toJSON()
        }));
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.registerMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });
        init();
        //display calendar
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
    },
    saveAllItems: function(){
        //var id = $(ev.currentTarget).data('id');
        //var model = this.collection.get(id);
        var id, model;
        var thisCollection = this.collection;
        $('[id^="registerMealTR"]').each(function(){
            id = $(this).data('id');
            model = thisCollection.get(id);
            $(this).find('td').each(function(){
                if ($(this).data('attribute')=="lunch" || $(this).data('attribute')=="dinner")
                {
                    var isChecked = $(this).find('input').is(':checked');
                    if (isChecked){
                        model.set($(this).data('attribute'), true);
                    }
                    else{
                        model.set($(this).data('attribute'), false);
                    }
                }
                else model.set($(this).data('attribute'), $(this).find('input').val());
            });
            model.save();          
        });
        this.render();

    },
    editAllItems: function(){
        $('[id^="registerMealTR"]').each(function(){
                $(this).find('td').each(function(){
                    if ($(this).data('attribute'))
                    {
                        var text = $(this).html();
                        if ($(this).data('attribute')=="lunch" || $(this).data('attribute')=="dinner")
                        {   
                            var isChecked = $(this).find('input').is(':checked');
                        //console.log(isChecked);
                        if (isChecked)
                            $(this).html('<input type="checkbox" checked>');
                        else
                            $(this).html('<input type="checkbox">');
                        }
                    else
                        $(this).html('<input type="text" value="' + text + '">');
                    }
                });          
        });
    }

});