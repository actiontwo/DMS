/**
 * DepositController
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
   *    `/deposit/find`
   */
  find: function (req, res) {
    if (req.param('id')) {
      res.send('find ID');
    }
    else {
      Deposit.find().sort('date').done(function (err, data) {
        if (err)
          console.log(err);
        else {
          res.send(data);
        }
      })
    }
  },
  /**
   * Action blueprints:
   *    `/deposit/create`
   */
  create: function (req, res) {
    var data = req.body;
    console.log(data);
    User.findOneByEmail(data.email).done(function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      data.userId = docs.id;
      data.email = docs.email;
      data.name = docs.lastname + " " + docs.firstname;

      console.log(data);
      Deposit.create(data).done(function (err, data) {
        if (err)
          res.send(err);
        else
          res.send('Save Successfull!')
      })
    });
  },

  /**
   * Action blueprints:
   *    `/deposit/destroy`
   */
  destroy: function (req, res) {
    var id = req.param('id');
    Deposit.destroy({id:id}).done(function(err,docs){
      if(err){
        console.log(err);
        res.send(err);
        return
      }
      console.log(docs);
      res.send('Done');

    });
  },

  /**
   * Action blueprints:
   *    `/deposit/update`
   */
  update: function (req, res) {

    var data = req.body;
    console.log(data);
    User.findOneByEmail(data.email).done(function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      if (docs) {
        data.userId = docs.id;
        data.email = docs.email;
        data.name = docs.lastname + " " + docs.firstname;
        console.log(data);
        Deposit.update({id: data.id}, data).done(function (err, data) {
          if (err)
            res.send(err);
          else
            res.send('Save Successfull!')
        });
        return;
      }
      res.send('can not update');
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DepositController)
   */
  _config: {}


};
