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
    RegisterMeal.find({userId: user.id, status: false}).done(function (err, meal) {
      for (i = 1; i <= time.numberDayOfThisMonth; i++) {
        var disabled = '';
        if (i < time.date)
          disabled = 'disabled';
        var dateText = tool.formatTwoNumber(time.month) + "/" + tool.formatTwoNumber(i) + "/" + time.year;
        data.push({
          number: i,
          date: dateText,
          day: new Date(time.year, time.month - 1, i).toString().split(" ")[0],
          lunch: {disabled: disabled, check: tool.search(dateText, 'lunch', meal)},
          dinner: {disabled: disabled, check: tool.search(dateText, 'dinner', meal)}
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
              lunch: "checked",
              dinner: 'checked'
            };
            for (j = 0; j < meal.length; j++) {
              if (id === meal[j].userId && meal[j].status === false) {
                check[meal[j].meal] = '';
              }
            }
            result.push({
              number: i + 1,
              date: time.currentDay,
              name: user[i].firstname + " " + user[i].lastname,
              lunch: check.lunch,
              dinner: check.dinner
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
        userId: req.session.user.id
      };
      // check user registed this day or not
      updateStatus(data, mealStatus[i].status);
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
function updateStatus(data, status) {
  collection = RegisterMeal;
  collection.find(data).done(function (err, meal) {

    if (err) {
      console.log(err);
    }
    else {
      if (meal.length > 0) {
        // day registered --> update status
        collection.update(data, {status: status}).done(function (err, meal) {
        });
      }
      else {
        // create new register meal if day register meal not exits
        data.status = status;
        collection.create(data).done(function (err, meal) {
        });
      }
    }
  });
};
