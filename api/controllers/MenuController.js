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
   * Suggest menu
   */
   getSuggest: function(req, res){
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    Suggest.find().done(function(err, data){
      if(err){
        res.send(err)
      }else{
        res.send(data)
      }      
    })
   },
   createSuggest: function(req, res){
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    var name = req.session.user.firstname + ' ' + req.session.user.lastname;
    var d = new Date();
    var currentDay = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var data = {
      suggestMeal: req.body.suggestMeal,
      note: req.body.note,
      name: name,
      date: currentDay,
      role: req.session.user.role
    };
    Suggest.create(data).done(function(err, data){
      if(err){
        res.send(err)
      }else{
        res.send(data)
      }
    })
   },
   deleteSuggest: function(req, res){
    var id = req.param('id');
    Suggest.destroy({id: id}).done(function(err){
      if(err){
        res.send(err);
        return;
      }else{
        res.send('Delete Ok');
      }        
    });
   },
  /**
   * Action blueprints:
   *    `/menu/find`
   */
  find: function (req, res) {

    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
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
   *    `/menu/create`
   */
  create: function (req, res) {    
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    var data = req.body;
    console.log(data);
    Menu.create(data).done(function (err, data) {
      if (err)
        res.send(err);
      else
        console.log(data);
        res.send('Save Successfully!');
    })   
  },

  /**
   * Action blueprints:
   *    `/menu/destroy`
   */
  destroy: function (req, res) {
    var id = req.param('id');
    Menu.destroy({id: id}).done(function(err, data){
      if(err){
        res.send(err);
        return;
      }
        res.send('Delete Ok');
        console.log('OK');
    });
  },

  /**
   * Action blueprints:
   *    `/menu/update`
   */
  update: function (req, res) {    
    var data = req.body;
    console.log(data);
    res.send(data.id);
    Menu.findOneById(data.id).done(function (err, docs) {
      console.log(docs);
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    if(docs){
      docs.id = data.id;
      docs.date = data.date;
      docs.dish[data.dish[0], data.dish[1], data.dish[2], data.dish[3], data.dish[5]];
      docs.note = data.note;      
      // console.log(docs);
      Menu.update({id: data.id}, data).done(function (err, docs) {
          if (err)
            res.send(err);
          else
            res.send('Save Successfull!');
            console.log('last');
            console.log(docs);
        });
        return;
    }      
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MenuController)
   */
  _config: {}


};
