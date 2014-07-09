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
      var checkValue = false;
      var numberOfMealsValue = 1; // why ?
      var dateBegin = 1;
      var userDefaultRegisterMeal = 0;
      var lastTime = 17;
      var time = tool.getCurrentDay();
      var checkTime = time.date; // get the number of the current day in this month
      if (time.hour > lastTime) {
        checkTime = time.date + 1;
      }
      //check user register meal default
      if (user.defaultRegisterMeal) {
        //checkValue = true;
        userDefaultRegisterMeal = 1;
      }
      async.waterfall([
        function(callback){
          RegisterMeal.find({userId: user.id}).done(function(err, meals) {
            var join_date = user.join_date;
            if (join_date) {
              join_date = join_date.split('/');
              // check date user join to DMS and set date begin register meal
              if (Math.ceil((new Date(join_date[2], join_date[0], 0) - new Date(time.year, time.month, 0)) / 86400000) === 0) {
                dateBegin = join_date[1];
              }
            }
            var mealsLength = meals.length;
            for (i = parseInt(dateBegin); i <= time.numberDayOfThisMonth; i++) {
              var disabled = false;
              var checkRegisterExist = false;
              // if i < current day, disable this checkbox
              if (i <= checkTime)
                disabled = true;
              // get date string (mm/dd/yyyy) form the first day to the last day of this month
              var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
              for (j = 0; j < mealsLength; j++) {
                if (dateText === meals[j].date) {
                  // user has already registered meal for this day
                  checkRegisterExist = true;
                  var checkDate = (meals[j].date).split('/');
                  if (checkDate[1] <= checkTime)
                    meals[j].disabled = true;
                }
              }
              if (!checkRegisterExist) {
                if (userDefaultRegisterMeal)
                {
                  checkValue = true;
                  numberOfMeals = 1;
                }
                else
                {
                  checkValue = false;
                  numberOfMealsValue = 0;
                }
                meals.push({
                  date: dateText,
                  day: new Date(time.year, time.month - 1, i).toString().split(" ")[0],
                  month: time.month,
                  year: time.year,
                  disabled: disabled,
                  status: checkValue,
                  numberOfMeals: numberOfMealsValue
                });
              }
            }
            callback(null, meals);
          });

      }
    ], function (err, result) {
      // result now equals 'done'
      res.send(result);
    });
  }, // End Index

  indexAdmin: function(req, res) {

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
    // get the next day
    var theNextDay = new Date(time.year, time.month - 1, time.date + 1);
    // get a string with the following format 'mm/dd/yyyy'
    var theNextDayString = tool.formatTwoNumber(theNextDay.getMonth()+1) + "/" + 
    tool.formatTwoNumber(theNextDay.getDate()) + "/" + theNextDay.getFullYear();

    RegisterMeal.find({
      date: theNextDayString
    }).done(function(err, meals) {
      // find in database how many person have registered for the next day's meal
      if (err) {
        res.send(err);
      } else {
        User.find().done(function(err, users) {
          if (err) {
            res.send(err)
          }
          var result = [];
          // loop all users
          for (i = 0; i < users.length; i++) {
            var id = users[i].id;
            var _firstname = users[i].firstname;
            var _lastname = users[i].lastname;
            var checkValue = false;
            var numberOfMealsValue = 0;
            var found = 0;
            var userDefaultRegisterMeal = 0;
            if (users[i].defaultRegisterMeal) userDefaultRegisterMeal = 1;
            // loop to look for the user that has already registered for theNextDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                found = 1;
                console.log("user: " + _firstname + " " + _lastname + " has set the meal by himselft");
                if (meals[j].status == true) checkValue = true;
                else checkValue = false;
                numberOfMealsValue = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop

            if (found == 0)
            {
              if (userDefaultRegisterMeal == 1)
              {
                console.log("user: " + _firstname + " " + _lastname + " has setDefaultRegisterMeal = 1");
                checkValue = true;
                numberOfMealsValue = 1;
              }
              else
              {
                checkValue = false;
                numberOfMealsValue = 0;
              }
            }
            // push an object to 'result' array
            result.push({
              date: theNextDayString,
              name: _firstname + " " + _lastname,
              status: checkValue,
              numberOfMeals: numberOfMealsValue
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

    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }

    console.log("<indexAdminViewByDay> <selectedDay>:" + req.body.selectedDay);
    var selectedDay = req.body.selectedDay;
    
    RegisterMeal.find({date: selectedDay}).done(function(err, meals){
      if (err) {
        res.send(err);
      } 
      else 
      {
        //console.log("meals.length: " + meals.length);
        User.find().done(function(err, users) {
          if (err) {
            res.send(err)
          }
          var result = [];
          // loop all users
          for (i = 0; i < users.length; i++) {
            var id = users[i].id;
            var _firstname = users[i].firstname;
            var _lastname = users[i].lastname;
            var checkValue = false;
            var numberOfMealsValue = 0;
            var found = 0;
            var userDefaultRegisterMeal = 0;
            if (users[i].defaultRegisterMeal) userDefaultRegisterMeal = 1;
            // loop to look for the user that has already registered for theNextDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                found = 1;
                console.log("user: " + _firstname + " " + _lastname + " has set the meal by himselft");
                if (meals[j].status == true) checkValue = true;
                else checkValue = false;
                numberOfMealsValue = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop

            if (found == 0)
            {
              if (userDefaultRegisterMeal == 1)
              {
                console.log("user: " + _firstname + " " + _lastname + " has setDefaultRegisterMeal = 1");
                checkValue = true;
                numberOfMealsValue = 1;
              }
              else
              {
                checkValue = false;
                numberOfMealsValue = 0;
              }
            }

            // push an object to 'result' array
            result.push({
              date: selectedDay,
              name: _firstname + " " + _lastname,
              status: checkValue,
              numberOfMeals: numberOfMealsValue
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

    console.log("<indexAdminViewByUser> selectedUser: " + req.body.selectedUser);
    var selectedUser = req.body.selectedUser;
    //split firstname & lastname
    var names = selectedUser.split(" ");
    var _firstname = names[0];
    var _lastname = names[1];
    var _userId = "";
    var result = [];

    User.find({firstname: _firstname, lastname: _lastname}).done(function(err, users){
      if (err) {
        res.send(err)
      }
      else
      {
        for(i=0;i<users.length;i++)
        {
          _userId = users[i].id;
        }  
      }
      RegisterMeal.find({userId: _userId}).done(function(err, meals){
        if (err) {
          res.send(err)
        }
        else
        {
          var checkValue = false;
          var numberOfMealsValue = 0;
          var _date = "";
          // begin loop
          for (j = 0; j < meals.length; j++){
            if (meals[j].status == true) checkValue = true;
            else checkValue = false;
            _date = meals[j].date;
            numberOfMealsValue = meals[j].numberOfMeals;

            result.push({
              date: _date,
              name: _firstname + " " + _lastname,
              status: checkValue,
              numberOfMeals: numberOfMealsValue
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
    var costPerMeal = 25000;
    data.userId = req.session.user.id;
    console.log(data);
//    ManagerParam.find().done(function(err, managerParams){
//      for (var i =0; i<managerParams.length;i++){
//        costPerMeal = managerParams[0].
//      }
//    });
    RegisterMeal.create(data).done(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(docs);
    });
  },
  update: function(req, res) {
    var data = req.body;
    data.userId = req.session.user.id;
    console.log(data);
    RegisterMeal.update({
      id: data.id
    }, data).done(function(err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(docs);
    });
  },
  searchByDay: function(req,res){

    console.log("dayFrom: " + req.body.dayFrom);
    console.log("dayTo: " + req.body.dayTo);
    var dayFromObj = new Date(req.body.dayFrom);
    var dayToObj = new Date(req.body.dayTo);
    var todayObj = new Date();
    var _userId = req.session.user.id;
    var result = [];

    var _status = true, _disabled = false, _numberOfMeals = 0, _date = '', _defaultRegisterMeal = 0;
    var found = 0;

    if (req.session.user.defaultRegisterMeal) {
      _defaultRegisterMeal = 1;
    }
    else _defaultRegisterMeal = 0;
    // the day the user join Dining Management System
    var joinDayObj = new Date(req.session.user.join_date);

    if (dayFromObj <= joinDayObj) dayFromObj = joinDayObj;

    RegisterMeal.find({userId: _userId}).done(function(err, meals) {
      for (var d = dayFromObj; d <= dayToObj; d.setDate(d.getDate() + 1)) {
        _date = tool.formatTwoNumber(d.getMonth() + 1) + "/" + tool.formatTwoNumber(d.getDate()) + "/" + d.getFullYear();

        if (d < todayObj || (d == todayObj && lastTime < todayObj.getHours())) _disabled = true;
        else _disabled = false;

        for (var i = 0; i < meals.length; i++) {
          if (meals[i].date == _date) {
            // found registermeal according to '_date' in the database
            _status = meals[i].status;
            _numberOfMeals = meals[i].numberOfMeals;
            found = 1;
          }
        }
        if (found != 1)
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
        found = 0;
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