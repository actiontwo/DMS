/**
 * RegisterMealController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var tool = require('../tool');
var async = require('async');

module.exports = {
  index: function(req, res) {
    var user = req.session.user;
    var _status = false;
    var _numberOfMeals = 1;
    var dateBegin = 1; // by default, this is the first day (of each month) to be rendered to the Register Meal view
    var userDefaultRegisterMeal = 0; // default [User Profile] defaultRegisterMeal value
    var _lastHour = 17; // default [ManagerParam] lastHour value
    var _excludeSatSun = true; // default [ManagerParam] excludeSatSun value
    var time = tool.getCurrentDay(); // get the day at the present
    var checkTime = time.date; // user can only adjust meal registrations from this checkTime point.
    // At first, checkTime is assigned as the current day of this month

    //get [User Profile] defaultRegisterMeal value from database
    if (user.defaultRegisterMeal) userDefaultRegisterMeal = 1;
    var array = []; // this array will contains the response Meal Registrations

    ManagerParam.find({name: 'manager'}).done(function(err, managerParams){
      // get [ManagerParam] lastHour & excludeSatSun value from database
      if (managerParams.length)
      {
        _lastHour = managerParams[0].lastHour;
        _excludeSatSun = managerParams[0].excludeSatSun;
      }
      // if current time (hour) surpass _lastHour (which means user can't edit
      // current day's meal registration), increase checkTime by 1 day
      if (time.hour > _lastHour) {
        checkTime = time.date + 1;
      }
      RegisterMeal.find({userId: user.id}).done(function(err, meals) {
        // get all user's meal registrations from database
        var join_date = user.join_date; // get user's join_date
        if (join_date) {
          join_date = join_date.split('/');
          // if join_date > dateBegin, set dateBegin to join_date[1] (because we don't have any database before the time
          // the user had registered his account)
          if (Math.ceil((new Date(join_date[2], join_date[0], 0) - new Date(time.year, time.month, 0)) / 86400000) === 0) {
            dateBegin = join_date[1];
          }
        }
        for (i = parseInt(dateBegin); i <= time.numberDayOfThisMonth; i++) {
          // loop from dateBegin to the end day of the current month
          var _day = new Date(time.year, time.month - 1, i).toString().split(" ")[0]; // get the shortname for this day,
          // like 'Mon', 'Tue'...'Sat', 'Sun'
          var _disabled = false; // indicates whether the current day is disabled or not
          var checkRegisterExist = false; // check if the current day's meal registration had existed in the database or not
          if (i <= checkTime)
          // if i < current day, disable this checkbox
            _disabled = true;
          // get date string (mm/dd/yyyy) form the first day to the last day of this month
          var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
          for (j = 0; j < meals.length; j++) {
            // check if dateText has existed among all models from 'meals'
            if (dateText === meals[j].date) {
              // user has already registered meal for this day
              // now get infos including status & numberOfMeals from database
              checkRegisterExist = true;
              _status = meals[j].status;
              _numberOfMeals = meals[j].numberOfMeals;
            }
          }
          if (!checkRegisterExist) {
            // if this dateText has not existed in database yet
            if (userDefaultRegisterMeal && _disabled==false)
            // this current day still editable (_disabled==false) and userDefaultRegister==1
            {
              _status = true;
              _numberOfMeals = 1;
            }
            else
            // otherwise, if this current day is not editable (_disabled==true)
            // or userDefaultRegisterMeal==0
            {
              _status = false;
              _numberOfMeals = 0;
            }
          } // end if !checkRegisterExist

          if ((_excludeSatSun && _day!='Sun' && _day!='Sat') || !_excludeSatSun)
          // if the current day is 'Sat' or 'Sun', it will be rendered if and only excludeSatSun==false
          {
            // add a model to the returning array
            array.push({
              date: dateText,
              day: _day,
              month: time.month,
              year: time.year,
              disabled: _disabled,
              status: _status,
              numberOfMeals: _numberOfMeals
            });
          }
        } // end loop from dateBegin to time.numberDayOfThisMonth
        res.send(array); // send the array back to the client
      });
    });
  }, // End Index

  indexAdmin: function(req, res) {
    // by default, the Register Meal Manager view will rendered the meal registrations
    // of all users for the next day
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    // get the current day in Date Object
    var time = tool.getCurrentDay();
    // get the next day in Date Object
    var theNextDay = new Date(time.year, time.month - 1, time.date + 1);
    // get a string of the next day with the following format 'mm/dd/yyyy'
    var theNextDayString = tool.formatTwoNumber(theNextDay.getMonth()+1) + "/" +
      tool.formatTwoNumber(theNextDay.getDate()) + "/" + theNextDay.getFullYear();
    // look up in database all meal registrations that have date attributes == theNextDayString
    RegisterMeal.find({
      date: theNextDayString
    }).done(function(err, meals) {
      // find in database how many people have registered for the next day's meal
      if (err) {
        res.send(err);
      }
      else {
        User.find({active: true}).done(function(err, users) {
          // find all actived users
          if (err) {
            res.send(err)
          }
          var result = []; // this array will contains all returning models
          // loop all users
          for (i = 0; i < users.length; i++) {
            var id = users[i].id;
            var _firstname = users[i].firstname;
            var _lastname = users[i].lastname;
            var _status = false;
            var _numberOfMeals = 0;
            var found = 0; // this indicates whether this user has registered for the next day's meal or not
            var userDefaultRegisterMeal = 0;
            if (users[i].defaultRegisterMeal) userDefaultRegisterMeal = 1;
            // loop to look for the user that has already registered for theNextDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                // this user has registered for the next day's meal
                // now get the existed data including status & numberOfMeals
                found = 1;
                if (meals[j].status == true) _status = true;
                else _status = false;
                _numberOfMeals = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop
            if (found == 0)
            {
              // if this user has not registered for the next day's meal
              // we will render it according to the user's defaultRegisterMeal setting
              if (userDefaultRegisterMeal == 1)
              {
                _status = true;
                _numberOfMeals = 1;
              }
              else
              {
                _status = false;
                _numberOfMeals = 0;
              }
            }
            // push an object to 'result' array
            result.push({
              date: theNextDayString,
              name: _firstname + " " + _lastname,
              status: _status,
              numberOfMeals: _numberOfMeals
            });
          }
          // end loop all users
          res.send(result);
        });
      }
    });
  },
  indexAdminViewByDay: function(req, res)
  {
    // this function is called when admin search for meal registrations by a specific DAY
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    var selectedDay = req.body.selectedDay; // get the selected day from client's request
    RegisterMeal.find({date: selectedDay}).done(function(err, meals){
      // find all meal registrations according to date==selectedDay from the database
      if (err) {
        res.send(err);
      }
      else {
        User.find({active: true}).done(function(err, users) {
          // find all actived users
          if (err) {
            res.send(err)
          }
          var result = []; // this array will contains all the meal registrations that will be returned
          // loop all users
          for (i = 0; i < users.length; i++) {
            var id = users[i].id;
            var _firstname = users[i].firstname;
            var _lastname = users[i].lastname;
            var _status = false;
            var _numberOfMeals = 0;
            var found = 0;
            var userDefaultRegisterMeal = 0;
            if (users[i].defaultRegisterMeal) userDefaultRegisterMeal = 1;
            // loop to look for the user that has already registered for the selectedDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                // this user has registered for the selectedDay's meal
                // now get the existed data including status & numberOfMeals
                found = 1;
                if (meals[j].status == true) _status = true;
                else _status = false;
                _numberOfMeals = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop
            if (found == 0)
            {
              // if this user has not registered for the selectedDay's meal
              // we will render it according to the user's defaultRegisterMeal setting
              if (userDefaultRegisterMeal == 1)
              {
                _status = true;
                _numberOfMeals = 1;
              }
              else
              {
                _status = false;
                _numberOfMeals = 0;
              }
            }
            // push an object to 'result' array
            result.push({
              date: selectedDay,
              name: _firstname + " " + _lastname,
              status: _status,
              numberOfMeals: _numberOfMeals
            });
          }
          // end loop all users
          res.send(result);
        });
      } // end else
    });

  },
  indexAdminViewByUser: function(req, res)
  {
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    var selectedUser = req.body.selectedUser; // get the selectedUser from client's request
    // this below lines of code helps split the selectedUser string to get user's firstname & lastname
    for (var i=0;i<selectedUser.length;i++)
    {
      if(selectedUser[i] == ' ') break;
    }
    var _firstname = selectedUser.slice(0, i);
    var _lastname = selectedUser.slice(i+1, selectedUser.length);

    var _userId = '';
    var result = []; // this array will contains all the returned models
    User.find({firstname: _firstname, lastname: _lastname, active: true}).done(function(err, users){
      // get users model according to their firstname & lastname from the database
      // notice: only get actived users
      if (err) {

        res.send(err);
      }
      else
      {
        if (users.length==0){
          console.log('error searching firstname: ' + _firstname + ' and lastname: ' + _lastname);
        }
        // this loop is used for getting the userId of the selectedUser
        for(i=0;i<users.length;i++)
        {
          _userId = users[i].id;
        }
      }
      RegisterMeal.find({userId: _userId}).done(function(err, meals){
        // look for all the meal registrations that the selectedUser has made
        if (err) {
          res.send(err)
        }
        else
        {
          var _status = false;
          var _numberOfMeals = 0;
          var _date = '';
          // begin loop in all the meal registrations found (meals)
          for (j = 0; j < meals.length; j++){
            // for each meal registration, get its information including status, numberOfMeals, date
            _status = meals[j].status;
            _date = meals[j].date;
            _numberOfMeals = meals[j].numberOfMeals;
            // push all the meal registrations found to the result array
            result.push({
              date: _date,
              name: _firstname + " " + _lastname,
              status: _status,
              numberOfMeals: _numberOfMeals
            });
          } // end loop
          // send the result back to the client side
          res.send(result);
        }
      });
    });
  },
  create: function(req, res) {
    var data = req.body;
    var _costPerMeal = 25000; // default [Manager Param] costPerMeal value
    data.userId = req.session.user.id;
    ManagerParam.find({name: 'manager'}).done(function(err, managerParams){
      // get the costPerMeal value from ManagerParam
      if (managerParams.length)
      {
        _costPerMeal = managerParams[0].costPerMeal;
      }
    });
    // set costPerMeal attributes for the current Register Meal model
    data.costPerMeal = _costPerMeal;
    RegisterMeal.find({userId: req.session.user.id, date: data.date}).done(function(err, outerMeals){
      if (outerMeals.length==0)
      {
        RegisterMeal.create(data).done(function(err, meals) {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
          res.send(meals);
        });
      }
      else {
        RegisterMeal.update({userId: req.session.user.id, date: data.date}, data).done(function (err, meals) {
          if (err) {
            console.log(err);
            res.send(err);
            return;
          }
          res.send(meals);
        });
      }
    });
  },
  update: function(req, res) {
    var data = req.body;
    data.userId = req.session.user.id;
    RegisterMeal.update({
      id: data.id
    }, data).done(function(err, meals) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(meals);
    });
  },
  searchByDay: function(req,res){
    // this function is called when user query their meal registrations by day
    var dayFromObj = new Date(req.body.dayFrom);
    var dayToObj = new Date(req.body.dayTo);
    if (req.body.dayFrom.length!=10 || req.body.dayTo.length!=10){
      res.send({error:'Invalid input'});
    }
    var todayObj = new Date();
    var _userId = req.session.user.id;
    var result = []; // this array will contains all the returned models
    var _status = true, _disabled = false, _numberOfMeals = 0, _date = '', _defaultRegisterMeal = 0;
    var found = 0; // indicates whether the meal registrations for a specific day has existed in the database or not
    if (req.session.user.defaultRegisterMeal) _defaultRegisterMeal = 1;
    // get the Date object from the day that user joined Dining Management System
    var joinDayObj = new Date(req.session.user.join_date);
    // if the dayFrom is earlier than the joinDay, set dayFromObj to joinDayObj
    if (dayFromObj <= joinDayObj) dayFromObj = joinDayObj;
    // look for all meal registrations of the current user
    RegisterMeal.find({userId: _userId}).done(function(err, meals) {
      // loop from the dayFromObj to the dayToObj
      for (var d = dayFromObj; d <= dayToObj; d.setDate(d.getDate() + 1)) {
        // get the date string from the current Date object d
        _date = tool.formatTwoNumber(d.getMonth() + 1) + "/" + tool.formatTwoNumber(d.getDate()) + "/" + d.getFullYear();
        // set disabled attribute (which represents editable or not) according to the current day & time
        if (d < todayObj || (d == todayObj && lastTime < todayObj.getHours())) _disabled = true;
        else _disabled = false;
        // loop through all the found meal registrations
        for (var i = 0; i < meals.length; i++) {
          if (meals[i].date == _date) {
            // found a meal registration according to '_date' in the database
            _status = meals[i].status;
            _numberOfMeals = meals[i].numberOfMeals;
            found = 1;
          }
        }
        if (found != 1)
        // if user has not registered for the current day's meal yet
        // we will stimulate its information according to _disabled & _defaultRegisterMeal values
        {
          if (_disabled){
            _status = false;
            _numberOfMeals = 0;
          }
          else
          {
            if (_defaultRegisterMeal)
            {
              _status = true;
              _numberOfMeals = 1;
            }
            else
            {
              _status = false;
              _numberOfMeals = 0;
            }
          }
        }
        // set found back to 0 before continue the loop
        found = 0;
        // push the Register Meal models to the result array
        result.push({
          date: _date,
          day: new Date(_date).toString().split(" ")[0],
          month: new Date(_date).getMonth() + 1,
          year: new Date(_date).getFullYear(),
          disabled: _disabled,
          status: _status,
          numberOfMeals: _numberOfMeals
        });
      } // end for() loop
      res.send(result);
    }); // end Register Meal find() function
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RegisterMealController)
   */
  _config: {}
};