// /**
//  * AuthController
//  *
//  */
//var bcrypt = require('bcrypt');
module.exports = {
  login: function (req, res) {
    res.view({
      partials: {
        header_login: '../partials/site/header_login',
        footer: '../partials/site/footer'
        },
    });  
  },
  process: function(req,res,next){
    email = req.param('email');
    password = req.param('password');
    console.log(email);
    console.log(password);
    if(!email||!password){
      console.log('You must enter both a email and password');
      //res.send(400, {error: "You must enter both a email and password"});
      res.view('auth/login', {error: "You must enter both a email and password"});
      //res.redirect('/login');
        return;
    }
    User.findOneByEmail(email, function (err,user){ 
      if(err) next(err);
      if(!user) {
        console.log('Email not found!');
        res.view('auth/login', { error: "Email not found!" });
        //res.redirect('/login');
        return;
      }
      var hasher = require("password-hash");
      if (hasher.verify(password, user.password)) {
        console.log(user.id);
      } else {
        console.log('Wrong password');
        res.view('auth/login',{error: "Wrong Password"});
        //res.redirect('/login');
        return;
      }
      req.session.user = user;
      //if user click remmeber 
      console.log(req.param('remember'));
      if(req.param('remember'))
        res.redirect('/#active/'+user.id+'/'+'remember');
      else 
        res.redirect('/#active/'+user.id+'/'+'noremember'); 
    });
    next();
},

  logout: function (req,res){
    req.session.user='';
    res.redirect('/');
  },
};

