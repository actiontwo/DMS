var hasher = require("password-hash");
var nodemailer = require("nodemailer");
module.exports = {
  getCurrentDay: function () {
    var time = new Date(),
      year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate();
    return {
      day: new Date(year, month, date).toString().split(" ")[0],
      date: date,
      year: year,
      month: month,
      numberDayOfThisMonth: new Date(year, month, 0).getDate(),
      currentDay: this.formatTwoNumber(month) + "/" + this.formatTwoNumber(date) + "/" + year,
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
  search: function (dateText, meal, myArray) {
    var result = 'checked';
    for (j = 0; j < myArray.length; j++) {
      if ((myArray[j].date == dateText) && (myArray[j].meal == meal)) {
        result = '';
      }
    }
    return result;
  },
  searchNumOfMeals: function (dateText, myArray) {
    var result = 0;
    for (j = 0; j < myArray.length; j++) {
      if (myArray[j].date == dateText) {
        if (myArray[j].numberOfMeals == undefined) result = 0;
        else result = myArray[j].numberOfMeals;
      }
    }
    return result;
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
