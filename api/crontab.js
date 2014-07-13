var schedule = require('node-schedule');
var nodemailer = require("nodemailer");

module.exports = {
  notiBalanceLow: function (rule) {
    return schedule.scheduleJob(rule, function () {
      // loop through all users that have their balance < 25000 VND
      User.find({active: true, balance: {'<': 25000}}).done(function (err, items) {
        // ... then send an email to notice them to take deposition
        for (i = 0; i < items.length; i++) {
          sendEmail(items[i].email, items[i].balance);
        }
      });
    });
  },
  updateRegisterMealJob: function (rule, tool) {
    return schedule.scheduleJob(rule, function () {
      var timeSet = tool.getNextDay(1); // getNextDay(1) return tomorrow day
      ManagerParam.findOneByName('manager').done(function (err, dataManParam) {
        User.find({active: true}).done(function (err, userData) {
          for (i = 0; i < userData.length; i++) {
            updateRegisterMeal(userData[i], timeSet, dataManParam.costPerMeal);
          }
        });
      });
    });
  },
  updateBalanceJob: function (rule, tool) {
    return schedule.scheduleJob(rule, function () {
      var timeSet = tool.getNextDay(1); // getNextDay(1) return tomorrow day
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
    subject: "deposit notification", // Subject line
    html: 'Your balance is ' + balance + ' VND Please take deposition'
  };
  smpt.sendMail(mailInfo, function (error, response) {
    if (error)
      console.log(error);
    console.log(response);
  });
}
// -------------------------------------------------------------------
// updateRegisterMeal ( user ; time )
// PARAMETERS:
//            @user (text) Input JSON
//            @time (num)  Input JSON
// RETURNS:
//            (bool) True or False based on proper
// PURPOSE:
//            Save Register meal for each user after default time
// REVISIONS:
//            6/23/14 - actiontwo - Initial revision
// -------------------------------------------------------------------

function updateRegisterMeal(user, _timeset, _costPerMeal) {
  RegisterMeal.findOne({userId: user.id, date: _timeset.nextDay}).done(function (err, meals) {
    if (meals) {
      console.log('This account with userId = ' + user.id + ' has already registered meal for the next day');
      return;
    }
    // this user hasn't registered meal for the next day yet. Now create new meal registration for him/her
    var data = {
      date: _timeset.nextDay,
      day: _timeset.day,
      month: _timeset.month,
      year: _timeset.year,
      disabled: true,
      status: (user.defaultRegisterMeal)
        ? true
        : false,
      numberOfMeals: (user.defaultRegisterMeal) ? 1 : 0,
      userId: user.id,
      costPerMeal: _costPerMeal,
      payment: false
    };
    RegisterMeal.create(data).done(function (err, items) {
      //console.log('Create new meal registration for ' + user.id);
      console.log(items);
    })
  });
}
// -------------------------------------------------------------------
// updateBalance ( user,time)
// PARAMETERS:
//            @user (JSON) Input JSON, content include variable about user ( id, name. ...)
//            @time (JSOn) Input JSON, content include variable about time (hour ,month, year, day...)
// RETURNS:
//            (bool) Not return
// PURPOSE:
//            Use this function to update balance for each users after lunch everyday
// REVISIONS:
//            6/23/14 - actiontwo - Initial revision
// -------------------------------------------------------------------

function updateBalance(user, _timeSet) {
  // find the user that has registered the meal for 'date'
  RegisterMeal.findOne({userId: user.id, status: true, date: _timeSet.nextDay}).done(function (err, mealsRegistered) {
    //console.log('userId: ' + user.id);
    //console.log('date: ' + _timeSet.nextDay);
    if (!mealsRegistered)
    {
      //console.log('this user.id: ' + user.id + ' has not registered for ' + _timeSet.nextDay);
      return;
    }
    if (mealsRegistered.payment)
    {
      //console.log('this user.id: ' + user.id + ' has already paid for the meal of ' + _timeSet.nextDay);
      return;
    }
    if (!user.numberOfMeals)
      user.numberOfMeals = 0;
    if (!user.balance)
      user.balance = 0;
    user.numberOfMeals = user.numberOfMeals + mealsRegistered.numberOfMeals;
    user.balance = user.balance - mealsRegistered.numberOfMeals * mealsRegistered.costPerMeal;
    //console.log('user Object before updated: ' + user);
    User.update({id: user.id},{balance:user.balance,numberOfMeals:user.numberOfMeals}).done(function (err, dataUser) {
      if (err) {
        console.log('Cannot update user payment : id:' + user.id);
        console.log(err);
        return;
      }
      RegisterMeal.update({id: mealsRegistered.id}, {payment: true}).done(function (err, data) {
        if (err) {
          console.log('Cannot update payment : registerMealId:' + mealsRegistered.id);
          console.log(err);
        }
      })
    });
  });
}