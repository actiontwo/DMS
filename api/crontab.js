var schedule = require('node-schedule');
var nodemailer = require("nodemailer");

module.exports = {
  notiBalanceLow: function (rule) {
    return schedule.scheduleJob(rule, function () {
      User.find({balance: {'<': 25000}}).done(function (err, items) {
        console.log(items);
        var data = [];
        for (i = 0; i < items.length; i++) {
          sendEmail(items[i].email, items[i].balance);
        }
      });
    });
  },
  updateRegistelMealJob: function (rule, tool) {
    return schedule.scheduleJob(rule, function () {
      var timeSet = tool.getNextDay(1);
      ManagerParam.findOneByName('manager').done(function (err, dataManParam) {
        User.find({active: true}).done(function (err, userData) {
          for (i = 0; i < userData.length; i++) {
            updateRegisterMeal(userData[i], timeSet, dataManParam.costs);
          }
        });
      });
    });
  },
  updateBalanceJob: function (rule, tool) {
    return schedule.scheduleJob(rule, function () {
      var timeSet = tool.getNextDay(1);
      User.find({active: true}).done(function (err, userData) {
        for (i = 0; i < userData.length; i++) {
          updateBalance(userData[i], timeSet);
        }
      });
    });
  }

};
function sendEmail(email, balance) {
  var smpt = nodemailer.createTransport("SMTP", {
    host: "just52.justhost.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
      user: "dms@designveloper.com",
      pass: "dsv123"
    }
  });
  var mailInfo = {
    from: "DMS  <dms@designveloper.com>", // sender address
    to: email, // list of receivers
    subject: "Deposit notification", // Subject line
    html: 'Your balance is ' + balance + ' VND Please take deposition'
  };
  smpt.sendMail(mailInfo, function (error, response) {
    if (error)
      console.log(error);
    console.log(response);
  });
}
// -------------------------------------------------------------------
// updateRegisterMeal ( User ; time )
// PARAMETERS:
//            @User (text) Input JSON
//            @time (num)  Input JSON
// RETURNS:
//            (bool) True or False based on proper
// PURPOSE:
//            Save Regsiter meal for each User after default time
// REVISIONS:
//            6/23/14 - actiontwo - Initial revision
// -------------------------------------------------------------------

function updateRegisterMeal(user, time, cost) {
  RegisterMeal.findOne({userId: user.id, date: time.nextDay}).done(function (err, dataRegister) {
    if (dataRegister) {
      console.log('Account have  been registed');
      return;
    }
    var data = {
      date: time.nextDay,
      day: time.day,
      month: time.month,
      year: time.year,
      disabled: false,
      status: (user.defaultRegisterMeal)
        ? true
        : false,
      numberOfMeals: 1,
      userId: user.id,
      costPerMeal: cost,
      payment: false
    };
    RegisterMeal.create(data).done(function (err, items) {
      console.log(items);
    })
  });
}
// -------------------------------------------------------------------
// updateBalance ( User,time)
// PARAMETERS:
//            @User (JSON) Input JSON, content include variable about User ( id, name. ...)
//            @time (JSOn) Input JSON, content include variable about time (hour ,month, year, day...)
// RETURNS:
//            (bool) Not return
// PURPOSE:
//            Use this function to update balance for each users after lunch everyday
// REVISIONS:
//            6/23/14 - actiontwo - Initial revision
// -------------------------------------------------------------------

function updateBalance(user, time) {

  RegisterMeal.findOne({userId: user.id, status: true, date: time.nextDay}).done(function (err, dataRegister) {

    if (!dataRegister) return;
    if (dataRegister.payment) return;

    if (!user.numberOfMeals)
      user.numberOfMeals = 0;
    if (!user.balance)
      user.balance = 0;

    user.numberOfMeals = user.numberOfMeals + dataRegister.numberOfMeals;
    user.balance = user.balance - dataRegister.numberOfMeals * dataRegister.costPerMeal;

    User.update({id: user.id}, user).done(function (err, dataUser) {
      if (err) {
        console.log('Cannot update User payment : id:' + user.id);
        console.log(err);
        return;
      }
      RegisterMeal.update({id: dataRegister.id}, {payment: true}).done(function (err, data) {
        if (err) {
          console.log('Cannot update confirm payment : paymentId:' + dataRegister.id);
          console.log(err);
        }
      })
    });
  });
}