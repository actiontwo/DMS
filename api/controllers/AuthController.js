// /**
//  * AuthController
//  *
//  */
var bcrypt = require('bcrypt');
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
    	console.log('Emai'+req.param('email'));
    	console.log('Emai'+req.param('password'));
        if(!req.param('email')||!req.param('password')){
        	res.send('You must enter both a email and password');
        	res.redirect('/login');
        	return;
        }
        User.findOneByEmail(req.param('email'), function (err,user){
        	if(err) next(err);
        	if(!user) {
        		res.send('Email not found!');
        		res.redirect('/login');
        		return;
        	}
        	bcrypt.compare(req.param('password'),user.password, function(err,valid){
        		if(err) return next(err);
        		if(!valid) {
        			res.send('Invalid username and password combination');
        			res.redirect('/login');
        			return;
        		}
        		res.redirect('/#menu');
        	});
        });
    },

    logout: function (req,res){
        req.logout();
        res.send('logout successful');
    },
};

