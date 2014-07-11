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

    var userId = req.session.user.id;
    var userRole = req.session.user.role;
    //check user role
    if (userRole === "user" || req.param('id')) {
      console.log(userId);
      Deposit.find({userId:userId}).sort('date').done(function (err, data) {
        if (err)
          console.log(err); else {
          res.send(data);
        }
      });
      return;
    }
    Deposit.find({deleteflg:{$ne:true}}).sort('date').done(function (err, data) {
      if (err)
        console.log(err); else {
        res.send(data);
      }
    })
  },
  /**
   * Action blueprints:
   *    `/deposit/create`
   */
  create: function (req, res) {
    if(req.session.user.role !=="admin"){
      res.send('You are not a admin');
      return;
    }
    var data = req.body;
    User.findOneByEmail(data.email).done(function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      if (!docs) {
        res.send(docs);
        return;
      }
      var deposit = parseInt(data.amount);
      if (docs.deposit) {
        deposit += docs.deposit;
      }
      var balance = docs.balance + parseInt(data.amount);

      data.userId = docs.id;
      data.email = docs.email;
      data.name = docs.lastname + " " + docs.firstname;
      Deposit.create(data).done(function (err, data) {
        if (err) {
          res.send(err);
          return;
        }

        User.update({id: docs.id}, {deposit: deposit, balance: balance}).done(function (err, userData) {
          if (err)
            res.send(err);
          else
            console.log(userData);
        });
        res.send(data);
      });
    });
  },
  /**
   * Action blueprints:
   *    `/deposit/destroy`
   */
  destroy: function (req, res) {
    if (req.session.user.role !== "admin") {
      res.send('Your are not admin');
      return;
    }
    var id = req.param('id');
    //check user deposit exits
    Deposit.findOne({id: id}).done(function (err, depositData) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      if (!depositData) {
        return;
      }
      User.findOne({id: depositData.userId}).done(function (err, userData) {
        if (err) {
          console.log(err);
          req.send(err);
          return;
        }
        var deposit = userData.deposit - depositData.amount;
        User.update({id: userData.id}, {deposit: deposit}).done(function (err, userDataupdate) {
          if (err) {
            console.log(err);
            return;
          }
          Deposit.update({id: id},{deleteflg:true,userDelete:req.session.user.firstname +' '+req.session.user.lastname}).done(function (err, dataDelete) {
            res.send(dataDelete);
          });
        });
      });
    });
  },
  /**
   * Action blueprints:
   *    `/deposit/update`
   */
  update: function (req, res) {

    var data = req.body;
    User.findOneByEmail(data.email).done(function (err, returnedUser) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      if (!returnedUser) {
        res.send(returnedUser);
        return;
      }
      data.userId = returnedUser.id;
      data.email = returnedUser.email;
      data.name = returnedUser.lastname + " " + returnedUser.firstname;
      Deposit.findOneById(data.id).done(function (err, dataDeposit) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        if (!dataDeposit) {
          res.send('dataDeposit not existed!');
          return;
        }
        var deposit = data.amount - dataDeposit.amount + returnedUser.deposit;
        var balance = data.amount - dataDeposit.amount + returnedUser.balance;
        User.update({id: returnedUser.id}, {deposit: deposit, balance: balance}).done(function (err, dataUserUpdate) {
          Deposit.update({id: data.id}, data).done(function (err, data) {
            if (err) {
              res.send(err);
              console.log(err);
              return;
            }
            res.send(data);
          });
        });
      });
    });
  },
  validate: function (req,res){
    data = req.param('data');
    console.log(data);
    User.findOneByEmail(data.email).done(function (err, docs) {
      if (!docs){
        console.log('aaaa');
        res.send('email_404');
      }
      else res.send('OK')
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DepositController)
   */
  _config: {}
};
