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
  /**
   * Action blueprints:
   *    `/registermealAd/find`
   */
  index: function (req, res) {
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    var user = req.session.user;
    var time = tool.getCurrentDay();
    var data = [];
    var checkValue;
    var numberOfMealsValue;
    // 'docs' means the returning data
    RegisterMeal.find({userId: user.id}).done(function (err, docs) {
      for (i = 1; i <= time.numberDayOfThisMonth; i++) {
        var disabled = '';
        // if i < current day, disable this checkbox
        if (i < time.date)
          disabled = 'disabled';
        var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
        numberOfMealsValue = tool.searchNumOfMeals(dateText, docs);
        if (numberOfMealsValue == 0) checkValue = '';
        else checkValue = 'checked';
        
        data.push({
          number: i,
          date: dateText,
          day: new Date(time.year, time.month - 1, i).toString().split(" ")[0],
          lunch: {disabled: disabled, check: checkValue},
          numberOfMeals: numberOfMealsValue
        });
      }
      res.send(data);
    });
  },// End Index

  indexAdmin: function (req, res) {
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
    var numberOfMealsValue;
    RegisterMeal.find({date: time.currentDay}).done(function (err, meal) {
      if (err) {
        res.send(err);
      }
      else {
        var data = [];
        User.find().done(function (err, user) {
          if (err) {
            res.send(err)
          }
          var result = [];
          for (i = 0; i < user.length; i++) {
            var id = user[i].id;
            var dayNotRegister = 0;
            var check = {
              lunch: "checked"
            };
            for (j = 0; j < meal.length; j++) {
              if (id === meal[j].userId && meal[j].status === false) {
                check[meal[j].meal] = '';
              }
            }
            if (check.lunch == 'checked') numberOfMealsValue = 1;
            else numberOfMealsValue = 0;
            result.push({
              number: i + 1,
              date: time.currentDay,
              name: user[i].firstname + " " + user[i].lastname,
              lunch: check.lunch,
              numberOfMeals: numberOfMealsValue
            })
          }
          res.send(result);
        });
      }
    });

  },
  /**
   * Action blueprints:
   *    `/registermeal/find`
   */
  find: function (req, res) {
    if (!req.session.user) {
      res.send('Not Working');
      return;
    }
    res.send({abc: 121});

  },

  /**
   * Action blueprints:
   *    `/registermeal/create`
   */

  create: function (req, res) {

    console.log(req.session.user);
    if (!req.session.user || !req.body.mealStatus) {
      res.send('Bye Bye');
      return;
    }
    var mealStatus = req.body.mealStatus;
    for (i = 0; i < mealStatus.length; i++) {
      var data = {
        date: mealStatus[i].date,
        meal: mealStatus[i].meal,
        //numberOfMeals: mealStatus[i].numberOfMeals,
        //status: mealStatus[i].status,
        userId: req.session.user.id
      };
      // check user registed this day or not
      console.log("Ham CREATE: (mealStatus[i].status = )" + mealStatus[i].status);
      updateData(data, mealStatus[i].status, mealStatus[i].numberOfMeals);
    }
    res.send([
      {data: 'update Success'},
      {data: 'ok'}
    ]);
  },

  /**
   * Action blueprints:
   *    `/registermeal/detroy`
   */
  destroy: function (req, res) {
    res.send('detroy');
  },

  /**
   * Action blueprints:
   *    `/registermeal/update`
   */
  update: function (req, res) {
    res.send('update');
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RegisterMealController)
   */
  _config: {
  }
};
function updateData(data, _status, _numberOfMeals) {
  collection = RegisterMeal;
  collection.find(data).done(function (err, array) {
    if (err) 
    {
      console.log(err);
    }
    else 
    {
      if (array.length > 0) 
      {
        // day registered --> update status
        collection.update(data, {status: _status, numberOfMeals: _numberOfMeals}).done(function (err, meal) {
          // console.log("date: " + data.date);
          // console.log("status: " + _status);
          // console.log("numberOfMeals: " + _numberOfMeals);
        });
      }
      else 
      {
        // create new register meal if day register meal not exits
        data.status = _status;
        data.numberOfMeals = _numberOfMeals;
        collection.create(data).done(function (err, meal) {
        });
      }
    }
  });
};
