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

  index: function (req, res) {
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
    //check user register meal deault
    if (user.defaultRegisterMeal) {
      checkValue = true;
    }
    // 'docs' means the returning data
    RegisterMeal.find({userId: user.id, month: time.month, year: time.year}).done(function (err, docs) {

      var join_date = user.join_date;
      join_date = join_date.split('/');
      // check date user join to DMS and set date begin register meal
      if (Math.ceil((new Date(join_date[2], join_date[0], 0) - new Date(time.year, time.month, 0)) / 86400000) === 0) {
        console.log('this month');
        dateBegin = join_date[1];
      }

      var lengthDocs = docs.length;
      for (i = dateBegin; i <= time.numberDayOfThisMonth; i++) {
        var disabled = false;
        var set = true;
        // if i < current day, disable this checkbox
        if (i < time.date)
          disabled = true;
        var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
        for (j = 0; j < lengthDocs; j++) {
          if (dateText === docs[j].date) {
            set = false;
          }
        }
        if (set) {
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

  create: function (req, res) {
    if (!req.session.user) {
      res.send('Bye Bye');
      return;
    }
    var data = req.body;
    data.userId = req.session.user.id;
    console.log(data);
    RegisterMeal.create(data).done(function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(docs);
    });
  },
  update: function (req, res) {
    if (!req.session.user) {
      res.send('Bye Bye');
      return;
    }
    var data = req.body;
    data.userId = req.session.user.id;
    console.log(data);
    RegisterMeal.update({id: data.id}, data).done(function (err, docs) {
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
  _config: {
  }
};
