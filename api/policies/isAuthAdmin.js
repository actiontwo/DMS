/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {

  // account is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.cookies.remember){
    req.session.user =req.cookies.user;
    req.session.authenticated =true;
  }
  if (req.session.authenticated){
    if (req.session.user.role === 'admin') {
      return next();
    }
    return res.forbidden('You are not permitted to perform this action.');
  }
  // account is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.redirect('/login');
};
