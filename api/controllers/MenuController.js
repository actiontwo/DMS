/**
 * MenuController
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
    var da = [
      {
        "brunch": "Lunch",
        "date": "06/09/2014",
        "dish": [ "Rau Xao Thit Bo",
          "Thịt gân bò xào",
          "Thịt luộc + cà pháo",
          "Đậu hủ dồn thịt",
          "Rau Xao Thit Bo"],
        "note": "hao han"
      },
      {
        "brunch": "Lunch",
        "date": "06/12/2014",
        "dish": [
          "Đùi gà luộc + muối tiêu chanh",
          "Rau Xao Thit Bo",
          "Trứng chiên",
          "Cá diêu hồng chiên",
          "Rau Xao Thit Bo"],
        "note": "test note"
      },
      {
        "brunch": "Lunch",
        "date": "06/13/2014",
        "dish": [
          "Rau Xao Thit Bo",
          "Cá diêu hồng chiên",
          "Mực xào thơm cà",
          "Thịt luộc + cà pháo",
          "Cá lóc kho tiêu"],
        "note": "50k mot phan nha"
      },
      {
        "brunch": "Dinner",
        "date": "06/10/2014",
        "dish": [
          "Rau Xao Thit Bo",
          "Cá diêu hồng chiên",
          "Mực xào thơm cà",
          "Rau Xao Thit Bo",
          "Cá diêu hồng chiên"],
        "note": "mon ngon moi ngay"
      }
    ];
    Menu.create(da).done(function (err, data) {
      res.send(data);
    });
    if (!req.session.user) {
      res.send('Please login');
      return;
    }
    var user = req.session.user;
    Menu.find().done(function (err, data) {
      if (err)
        console.log(err);
      else {
        res.send(data);
      }
    })
  },
  /**
   * Action blueprints:
   *    `/menu/find`
   */
  find: function (req, res) {

  },

  /**
   * Action blueprints:
   *    `/menu/create`
   */
  create: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Action blueprints:
   *    `/menu/destroy`
   */
  destroy: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Action blueprints:
   *    `/menu/update`
   */
  update: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MenuController)
   */
  _config: {}


};
