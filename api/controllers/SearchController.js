/**
 * SearchController
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

  index: function (req, res) {
    var model = req.body.model;

    switch (model) {
      case 'registermeal':
        model = RegisterMeal;
        break;
      case 'menu':
        model = Menu;
        break;
      case 'expense':
        model = Expense;
        break;
      case 'deposit':
        model = Deposit;
        break;
      case 'report':
        model = Report;
        break;
    }

    var data = {
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      model: model
    };
    var from = data.dateFrom;
    var to = data.dateTo;

    model.find({
      where: {
        date: {
          '>=': from,
          '<=': to
        }
      }
    }).done(function (err, docs) {
      if (err)
        res.send(err);
      else
        res.send(docs);
    })

  },
  _config: {}
};
