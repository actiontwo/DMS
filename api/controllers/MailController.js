/**
 * MailController
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
var CronTab = require('../crontab');
var rule = {
  notiBalanceLow: {
    dayOfWeek: [1, 2, 3, 4, 5],
    hour: 17,
    minute: 10,
    second: 0
  },
  registerMealJob: {
    // please edit rule settings to
    dayOfWeek: [0, 1, 2, 3, 4],
    hour: 17,
    minute: 0,
    second: 0
//        dayOfWeek: [0, 1, 2, 3, 4, 5],
//        hour: 16,
//        minute: 18,
//        second: 0
  },
  updateBalance: {
    // please edit this rule settings to to
    dayOfWeek: [0, 1, 2, 3, 4],
    hour: 17,
    minute: 5,
    second: 0
    // please edit this to hour: 17 and minute: 5
//    dayOfWeek: [0, 1, 2, 3, 4, 5],
//    hour: 16,
//    minute: 19,
//    second: 0
  }
};

var notiBalanceLow = CronTab.notiBalanceLow(rule.notiBalanceLow);
var updateRegisterMealJob = CronTab.updateRegisterMealJob(rule.registerMealJob, tool);
var updateBalanceJob = CronTab.updateBalanceJob(rule.updateBalance, tool);

module.exports = {
  sendMail: function (req, res) {
    var data = req.body;
    var smtpTransport = tool.smtpTransport();
    var mailInfo = {
      from: "DMS  <dms@designveloper.com>", // sender address
      replyTo: req.session.user.email,
      bcc: data.listEmail, // list of receivers
      subject: "Deposit Notification", // Subject line
      html: data.content
    };
    smtpTransport.sendMail(mailInfo, function (error, response) {
      if (error)
        console.log(error);
      console.log(response);
      res.send({data: 'Send Succsess'});
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MailController)
   */
  _config: {}
};
