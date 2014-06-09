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
//          Declare RegisterMealView
// Class:
//          RegisterMealView
// Functions:
//          initialize; addDetailsInfo; getCurrentMonth; checkIfCurrentMonthExisted;
//          getDaysInMonth; getDayString; getDaysString; render; sortRegisterMeals;
//          editRegisterMeal; saveRegisterMeal; viewByDay; viewMealRegistration;
//          deleteAllItems; showAllItems; saveAllItems; editAllItems
// Called From:
//          (script) assets/linker/js/routes.js, 
//          assets/linker/js/views/viewMealRegistration.js
// Author:
//          Son Le (sontl@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Son Le - Added DSV code style.
// =============================================================================
var tempCollection;
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
		// -------------------------------------------------------------------
		// addDetailsInfo ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		// 						Add details information such as datepicker, "No" column to the view
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		addDetailsInfo: function()
		{
				init();
				//display calendar
				this.$('.datepicker').datepicker({
						showOn: "button",
						buttonImage: "images/calendar.png",
						buttonImageOnly: true,
				});
				// display no (number) column
				var count = 1;
				if (tempCollection.length == 0) count = 0;
				$('.registerMealTR').each(function(){
						$(this).find('.no_td').html(count);
								count++;
				});
		},
		// -------------------------------------------------------------------
		// getCurrentMonth ()
		// RETURNS:
		//            Name of the current month
		// PURPOSE:
		// 						Calculate current time, return the name of the current month
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
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
		// -------------------------------------------------------------------
		// checkIfCurrentMonthExisted ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Check if the days for current month of this year are 
		//						already existed in the database
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		checkIfCurrentMonthExisted: function(){
				// get current day, month and year
				var currentDay = new Date();
				var currentMonth = currentDay.getMonth()+1;
				var currentYear = currentDay.getFullYear();
				var dayCount = this.getDaysInMonth(currentMonth, currentYear);
				var thisCollection = this.collection;
				var i=1;
				var already = 0;

				// this part check whether the current month of this year already existed in the database
				this.collection.each(function(modelIn){
						var dayValue = modelIn.get("date").trim();
						var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
						var modelMonth = tempDay.getMonth()+1;
						var modelYear= tempDay.getFullYear();
						if (modelMonth == currentMonth && modelYear == currentYear) already = 1;
				});
				if (already == 0 )
						// if not already existed, create new models for the current month of this year
				{
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
						// if already existed, do nothing
				{
				}
		},
		// -------------------------------------------------------------------
		// getDaysInMonth (month ,year)
		// PARAMETERS:
		//            @month (string) Input month
		//            @year (string) Input year
		// RETURNS:
		//            Number of days in the input month & year
		// PURPOSE:
		// 						Returns the number of days in the provided month & year
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		getDaysInMonth: function(month,year){
				return new Date(year, month, 0).getDate();
		},
		// -------------------------------------------------------------------
		// getDayString (_date)
		// PARAMETERS:
		//            @_date (Object) Input Date object
		// RETURNS:
		//            A string with the following format "mm/dd/yyyy"
		// PURPOSE:
		// 						Returns readable date string from the input Date object
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------		
		getDayString: function(_date){
				var month = _date.getMonth()+1;
				if (month.toString().length==1) month = "0" + month;
				var date = _date.getDate();
				if (date.toString().length==1) date = "0" + date;
				return month + "/" + date + "/" + _date.getFullYear();
		},
		// -------------------------------------------------------------------
		// getDaysInWeek (_currentDay, _currentMonth, _currentYear)
		// PARAMETERS:
		//            @_currentDay (number) Input date
		//            @_currentMonth (number) Input month
		//            @_currentYear (number) Input year
		// RETURNS:
		//            A string contains the first 3 characters from the name 
		//						of the provided day in a week
		// PURPOSE:
		// 						Returns day name (in week) for the provided date, month & year
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------	
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

				// check if the days for current month of this year are already existed
				this.checkIfCurrentMonthExisted();

				// By default, display only days of this month in the current view
				var currentDay = new Date();
				var currentMonth = currentDay.getMonth()+1;
				var currentYear = currentDay.getFullYear();
				tempCollection = new RegisterMealCollection();

				// add all models of the current month of this year to variable "tempCollection"
				this.collection.each(function(modelIn){
						console.log(userLogin.get('firstname'));
						var name = userLogin.get('firstname')+ ' ' +userLogin.get('lastname');
						modelIn.set({'name': name});
						
						var dayValue = modelIn.get("date").trim();
						var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
						var modelMonth = tempDay.getMonth()+1;
						var modelYear= tempDay.getFullYear();
						if (modelMonth == currentMonth && modelYear == currentYear) tempCollection.add(modelIn);
				});
				// render this view using the tempCollection
		this.$el.html(Templates['registerMeal/registerMeal']({
			//registerMeals: this.collection.toJSON()
						registerMeals: tempCollection.toJSON()
		}));
				// add details information such as datepicker, "No" column
				this.addDetailsInfo();
				//display current month
				$('#h1MonthInfo').html(this.getCurrentMonth());
	},
		// -------------------------------------------------------------------
		// sortRegisterMeals ( ev )
		// PARAMETERS:
		//            @ev (Event) Input click event 
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Sort all the meal registration according to the chosen attribute
		//						Trigger when user click each table row header
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
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
		// -------------------------------------------------------------------
		// editRegisterMeal ( ev )
		// PARAMETERS:
		//            @ev (Event) Input click event 
		// RETURNS:
		//            Nothing
		// PURPOSE:
		// 						Edit current meal registration
		//						Trigger when user click the Edit icon on each row
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
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
		// -------------------------------------------------------------------
		// saveRegisterMeal ( ev )
		// PARAMETERS:
		//            @ev (Event) Input click event 
		// RETURNS:
		//            Nothing
		// PURPOSE:
		// 						Save current meal registration
		//						Trigger when user click the Save icon on each row
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
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
		// -------------------------------------------------------------------
		// viewByDay ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Filter & display models satisfy the Date Picker limit
		//						Trigger when user click the 'Search' button
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		viewByDay: function(){
				// create date objects from dateTo & dateFrom string
				var dateFromString = ($('.find .find-from').find('input').val());
				dateFrom = new Date(dateFromString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
				var dateToString = ($('.find .find-to').find('input').val());
				dateTo = new Date(dateToString.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
				// create a tempCollection to contains search results
				tempCollection = new RegisterMealCollection();
				// add results to the tempCollection
				this.collection.each(function(modelIn){
						var dayValue = modelIn.get("date").trim();
						var tempDay = new Date(dayValue.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
						if(tempDay >= dateFrom && tempDay <= dateTo)
						{
								tempCollection.add(modelIn);
						}
				});
				this.$el.html(Templates['registerMeal/registerMeal']({
						registerMeals: tempCollection.toJSON()
				}));
				// add details information such as datepicker, "No" column
				this.addDetailsInfo();
				// display current month
				$('#h1MonthInfo').html(this.getCurrentMonth());
				// display current dateFrom and dateTo back to this view
				$('.find .find-from').find('input').val(dateFromString);
				$('.find .find-to').find('input').val(dateToString);
		},
		// -------------------------------------------------------------------
		// viewMealRegistration ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Display View Meal Registration view
		//						Trigger when user click the 'View Meal Registration' tab
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		viewMealRegistration: function(){
				this.remove();
				var viewMealRegister_new = new ViewRegisterMealView({collection: this.collection});
				$("#main").html(viewMealRegister_new.el);
				viewMealRegister_new.render();
		},
		// -------------------------------------------------------------------
		// deleteAllItems ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Delete all models from the current Register Meal collection
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		deleteAllItems: function(){
				// deletet all Items from this.collection
				var thisCollection = this.collection;
				var i = 1;
				thisCollection.each(function(modelIn){
						modelIn.destroy();
						i++;
				});
		},
		// -------------------------------------------------------------------
		// showAllItems ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Display all models from the current Register Meal collection
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		showAllItems: function(){
				this.$el.html(Templates['registerMeal/registerMeal']({
						registerMeals: this.collection.toJSON()
				}));
				// add details information such as datepicker, "No" column
				this.addDetailsInfo();
				// display the title as "Show all items"
				$('#h1MonthInfo').html("SHOW ALL ITEMS");
		},
		// -------------------------------------------------------------------
		// saveAllItems ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Save all editting models to the current Register Meal collection
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
		saveAllItems: function(){
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
		// -------------------------------------------------------------------
		// editAllItems ()
		// RETURNS:
		//            Nothing
		// PURPOSE:
		//						Enable to edit all current models
		// REVISIONS:
		//            05/30/14 - Son Le - Initial revision
		// -------------------------------------------------------------------
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