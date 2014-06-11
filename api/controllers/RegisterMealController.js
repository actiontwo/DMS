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
    if (req.param('id')) {
      res.send('find ID');
    }
    else {
      var date = new Date();
      var day = date.getDay();
      var year = date.getFullYear();
      var month = date.getMonth();
      var numberDayOfThisMonth = new Date(year, (month + 1), 0).getDate();

      var data = {
        month: new Date(year, month, 0).toString().split(" ")[1]
      };
      var dateDetail = [];
      for (i = 1; i <= numberDayOfThisMonth; i++) {
        var disabled = '';
        if (i < date.getDate())
          disabled = 'disabled';
        dateDetail.push({
          number: i,
          date: month + "/" + i + "/" + year,
          day: new Date(year, month, i).toString().split(" ")[0],
          lunch: {disabled: disabled, check: "checked"},
          dinner: {disabled: disabled, check: "checked"}
        });
      }
      data.dateDetail = dateDetail;
      res.send(data);
    }

  },

  /**
   * Action blueprints:
   *    `/registermeal/create`
   */
  create: function (req, res) {

    res.send('create');
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
  _config: {}


};
