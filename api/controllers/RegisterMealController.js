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

module.exports = {

  index: function(req, res) {
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    var user = req.session.user;
    var time = tool.getCurrentDay();
    var data = [];
    var checkValue = false;
    var numberOfMealsValue = 1;
    var dateBegin = 1;
    var lastTime = 20;
    var checkTime = time.date;

    if (time.hour > lastTime) {
      checkTime = time.date + 1;
    }
    //check user register meal deault
    if (user.defaultRegisterMeal) {
      checkValue = true;
    }
    // 'docs' means the returning data
    RegisterMeal.find({
      userId: user.id,
      month: time.month,
      year: time.year
    }).done(function(err, docs) {

      var join_date = user.join_date;
      if (join_date) {
        join_date = join_date.split('/');
        // check date user join to DMS and set date begin register meal
        if (Math.ceil((new Date(join_date[2], join_date[0], 0) - new Date(time.year, time.month, 0)) / 86400000) === 0) {
          dateBegin = join_date[1];
        }
      }
      var lengthDocs = docs.length;
      for (i = dateBegin; i <= time.numberDayOfThisMonth; i++) {
        var disabled = false;
        var checkRegisterExist = false;
        // if i < current day, disable this checkbox

        if (i <= checkTime)
          disabled = true;

        var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
        for (j = 0; j < lengthDocs; j++) {
          if (dateText === docs[j].date) {
            checkRegisterExist = true;
            var checkDate = (docs[j].date).split('/');
            if (checkDate[1] <= checkTime)
              docs[j].disabled = true;
          }
        }
        if (!checkRegisterExist) {
          docs.push({
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
      res.send(docs);
    });
  }, // End Index

  indexAdmin: function(req, res) {
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    var time = tool.getCurrentDay();
    var theNextDay = new Date(time.year, time.month - 1, time.date + 1);
    var theNextDayString = tool.formatTwoNumber(theNextDay.getMonth()+1) + "/" + 
    tool.formatTwoNumber(theNextDay.getDate()) + "/" + theNextDay.getFullYear();

    RegisterMeal.find({
      date: theNextDayString
    }).done(function(err, meals) {
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
            // loop to look for the user that has already registered for theNextDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                if (meals[j].status == true) checkValue = true;
                else checkValue = false;
                numberOfMealsValue = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop

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
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
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
            // loop to look for the user that has already registered for theNextDay
            for (j = 0; j < meals.length; j++){
              if (meals[j].userId == id)
              {
                if (meals[j].status == true) checkValue = true;
                else checkValue = false;
                numberOfMealsValue = meals[j].numberOfMeals;
              }
              else
              {
              }
            }
            // end meals loop

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
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
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
    if (!req.session.user) {
      res.send('Bye Bye');
      return;
    }
    var data = req.body;
    data.userId = req.session.user.id;
    console.log(data);
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
    if (!req.session.user) {
      res.send('Bye Bye');
      return;
    }
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

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RegisterMealController)
   */
  _config: {}
};