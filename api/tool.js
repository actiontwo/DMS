var hasher = require("password-hash");
var nodemailer = require("nodemailer");
module.exports = {
  getCurrentDay: function () {
    var time = new Date(),
      year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate();
    return {
      day: new Date(year, month, date).toString().split(" ")[0], // get the first 3 digits from currentDay
      // like Mon, Tue, Wed etc...
      date: date, // get the number of this day in a month
      year: year,
      month: month,
      numberDayOfThisMonth: new Date(year, month, 0).getDate(), // get the total days of this month
      currentDay: this.formatTwoNumber(month) + "/" + this.formatTwoNumber(date) + "/" + year, // get
      hour: time.getHours()
    };
  },
  getNextDay: function (numberDay) {
    var time = new Date();
    time.setDate(time.getDate() + numberDay);
    var year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate();
    return {
      day: new Date(year, month, date).toString().split(" ")[0],
      date: date,
      year: year,
      month: month,
      numberDayOfThisMonth: new Date(year, month, 0).getDate(),
      nextDay: this.formatTwoNumber(month) + "/" + this.formatTwoNumber(date) + "/" + year,
      hour: time.getHours()
    };

  },
  formatTwoNumber: function (number) {
    return number < 10
      ? '0' + number
      : number;
  },
  smtpTransport: function () {
    return nodemailer.createTransport("SMTP", {
      host: "just52.justhost.com", // hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      auth: {
        user: "dms@designveloper.com",
        pass: "dsv123"
      }
    });
  }
};
