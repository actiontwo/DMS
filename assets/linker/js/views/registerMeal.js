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
	render: function() {
		this.$el.html(Templates['registerMeal/registerMeal']({
			registerMeals: this.collection.toJSON()
		}));
        var count = 1;
        if (this.collection.length == 0) count = 0;
        $('.registerMealTR').each(function(){
            $(this).find('.no_td').html(count);
                count++;
        });
        init();
	},
	events: {
        'click [id^="th_"]': 'sortRegisterMeals',
        'click [id^="edit-registerMeal"]':'editRegisterMeal',
        'click [id^="save-registerMeal"]': 'saveRegisterMeal',
        'click [id="btnViewByDay"]' : 'viewByDay',
        'click [id="btnViewMealRegister"]' : 'btnViewMealRegister'
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
        // bind edit event to the button
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
    },
    btnViewMealRegister: function(){
        var viewMealRegister_new = new ViewRegisterMealView({collection: this.collection});
        viewMealRegister_new.render();
    }

});