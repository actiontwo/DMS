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