var ViewRegisterMealView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'view_meal_registration',
	initialize: function() {
		this.listenTo(this.collection, 'sync reset sort remove add create', this.render);
        this.collection.sort_order = {
            date: 1,
            lunch: 1,
            dinner: 1,
        };

	},
    events: {
        'click [id="btnViewByDayAndName"]' : 'viewMealRegistrationByNameAndDay',
        'click [id="btnRegisterMeal"]' : 'btnRegisterMeal',
        'click [id^="th_"]' : 'sortViewMealRegistrations'

    },
	render: function() {
		this.$el.html(Templates['registerMeal/viewMealRegistration']({
			viewRegisterMeals: this.collection.toJSON()
		}));
        // add numbers to "no" collumn
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.viewRegisterMealTR').each(function(){
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

        // add list of usernames to the comboBox '#nameToBeSelected'
        var myArray = [];
        this.collection.each(function(model){
            var name = model.get('name');
            if (myArray.indexOf(name) < 0)
                myArray.push(name);
        });
        for (var i = 0; i<myArray.length;i++){
            $('#nameToBeSelected').append('<option class="selectedName">'+myArray[i]+'</option>');
        }
	},
    btnRegisterMeal: function(){
        // remove current view
        this.remove();
        // create a new Register Meal view
        var viewRegisterMeal_new = new RegisterMealView({collection: this.collection});
        $("#main").html(viewRegisterMeal_new.el);
        viewRegisterMeal_new.render();
    },
    viewMealRegistrationByNameAndDay: function(){
        // identify input name, dateFrom, dateTo
        var nameSelected = $('.find .find-name select').val();
        var dateFromString = ($('.find .find-from').find('input').val());
        dateFrom = new Date(dateFromString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var dateToString = ($('.find .find-to').find('input').val());
        dateTo = new Date(dateToString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

        // create a new collection, using this same View Meal Registration view
        var tempCollection = new RegisterMealCollection();
        var numberOfLunches = 0;
        var numberOfDinners = 0;

        // if any of the items in this.collection satisfy the conditions, add it to the tempCollection
        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var nameFromModel = modelIn.get("name");
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            if(tempDay >= dateFrom && tempDay <= dateTo && nameFromModel == nameSelected)
            {
                tempCollection.add(modelIn);
            }
        });

        // calculate information for the TOTAL row
        tempCollection.each(function(modelIn){
            if (modelIn.get('lunch')==true) numberOfLunches++;
            if (modelIn.get('dinner')==true) numberOfDinners++;
        });

        this.$el.html(Templates['registerMeal/viewMealRegistration']({
            viewRegisterMeals: tempCollection.toJSON()
        }));
        // add numbers to "no" collumn
        var count = 1;
        if (tempCollection.length == 0) count = 0;
        $('.viewRegisterMealTR').each(function(){
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

        // add list of usernames to the comboBox '#nameToBeSelected'
        var myArray = [];
        this.collection.each(function(model){
            var name = model.get('name');
            if (myArray.indexOf(name) < 0)
                myArray.push(name);
        });
        for (var i = 0; i<myArray.length;i++){
            $('#nameToBeSelected').append('<option class="selectedName">'+myArray[i]+'</option>');
        }

        // display current dateFrom, dateTo the view
        $('.find .find-from').find('input').val(dateFromString);
        $('.find .find-to').find('input').val(dateToString);
        // fill information to TOTAL row
        $('#thTotalLunch').html(numberOfLunches);
        $('#thTotalDinner').html(numberOfDinners);
    },
    sortViewMealRegistrations: function(ev) {
        var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    }
});

