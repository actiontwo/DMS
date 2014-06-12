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

module.exports = {


  /**
   * Action blueprints:
   *    `/registermeal/find`
   */
  find: function (req, res) {
    if (!req.session.user) {
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
    }
    else {
      var date = new Date();
      var day = date.getDay();
      var year = date.getFullYear();
      var month = date.getMonth();
      var numberDayOfThisMonth = new Date(year, (month + 1), 0).getDate();
      var data = [];
      console.log(req.session.user.id);
      RegisterMeal.find({userId: req.session.user.id, status: false}).done(function (err, meal) {
        // console.log(search('6/12/2014','lunch',meal));
        for (i = 1; i <= numberDayOfThisMonth; i++) {
          var disabled = '';
          if (i < date.getDate())
            disabled = 'disabled';
          var dateText = (month + 1) + "/" + i + "/" + year;

          data.push({
            number: i,
            date: dateText,
            day: new Date(year, month, i).toString().split(" ")[0],
            lunch: {disabled: disabled, check: search(dateText, 'lunch', meal)},
            dinner: {disabled: disabled, check: search(dateText, 'dinner', meal)}
          });
        }
        res.send(data);
      });

      //res.send(data);
    }

  },

  /**
   * Action blueprints:
   *    `/registermeal/create`
   */
  create: function (req, res) {
    var data = {
      date: req.body.date,
      meal: req.body.meal,
      userId: req.session.user.id//req.body.userId
    };
    //check user registed this day or not
    RegisterMeal.find(data).done(function (err, meal) {
      if (err) {
        res.send(err);
      }
      else {
        if (meal.length > 0) {
          // day registered --> update status
          RegisterMeal.update(data, {status: req.body.status}).done(function (err, meal) {
            return;
          });
        }
        else {
          // create new register meal if day register meal not exits
          data.status = req.body.status;
          RegisterMeal.create(data).done(function (err, meal) {
            return;
          });
        }
      }
    });
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

function search(date, meal, myArray) {
  var result = 'checked';
  for (j = 0; j < myArray.length; j++) {
    if ((myArray[j].date == date) && (myArray[j].meal == meal)) {
      result = '';
    }
  }
  return result;
}