var ViewRegisterMealView = Backbone.View.extend({
	tagName: 'div',
	className: 'menus',
	id: 'view_register_meal',
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
	render: function() {
		this.$el.html(Templates['registerMeal/viewMealRegister']({
			viewRegisterMeals: this.collection.toJSON()
		}));
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.viewRegisterMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });
        init();
	},
	events: {
        'click [id^="th_"]': 'sortRegisterMeals',
        'click [id="btnViewByDay"]' : 'viewByDay',
        'click [id="viewRegisterMeal"]' : 'viewRegisterMeal'
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
    viewByDay: function(){
        var dateFromString = ($('.find .find-from').find('input').val());
        dateFrom = new Date(dateFromString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var dateToString = ($('.find .find-to').find('input').val());
        dateTo = new Date(dateToString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        console.log('dateFrom :' + dateFrom);
        console.log('dateTo :' + dateTo);
        var tempCollection = new RegisterMealCollection();
        this.collection.each(function(modelIn){
            var dayValue = modelIn.get("date").trim();
            var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            console.log(tempDay);
            if(tempDay > dateFrom && tempDay < dateTo)
            {
                tempCollection.add(modelIn);
            }
        });

        this.$el.html(Templates['registerMeal/registerMeal']({
            registerMeals: tempCollection.toJSON()
        }));
        init();
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.registerMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });

        $('.find .find-from').find('input').val(dateFromString);
        $('.find .find-to').find('input').val(dateToString);
    }

});