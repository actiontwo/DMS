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
module.exports = {

  sendMail: function (req, res) {
    var data = req.body;
    var smtpTransport = tool.smtpTransport();
    var mailInfo = {
      from: "DMS  <dms@designveloper.com>", // sender address
      replyTo: req.session.user.email,
      bcc: data.listEmail, // list of receivers
      subject: "Deposit notification", // Subject line
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
