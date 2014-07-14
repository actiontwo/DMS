/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */

/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {
  // main Controller
  '/': {
    //view: 'site/index'
    controller: 'main'
  },
  '/success': {
    controller: 'main',
    action: 'success'
  },
  'get /managerParam':{
    controller: 'main',
    action: 'indexOptions'
  },
  'post /managerParam': {
    controller: 'main',
    action: 'updateManagerParam'
  },
  '/roleCheck': {
    controller: 'user',
    action: 'roleCheck'
  },
  // account Controller
  '/forgetPassword': {
    controller: 'user',
    action: 'forgetPassword'
  },
  '/resetPassword': {
    controller: 'user',
    action: 'resetPassword'
  },
  '/confirmResetPassword': {
    controller: 'user',
    action: 'confirmResetPassword'
  },
  '/login': {
    controller: 'user',
    action: 'login'
  },
  '/logout': {
    controller: 'user',
    action: 'logout'
  },
  '/registerUser': {
    controller: 'user',
    action: 'register'
  },
  '/checkUserLogin/?': {
    controller: 'user',
    action: 'checkUserLogin'
  },
  '/activeAccount/?': {
    controller: 'user',
    action: 'activeAccount'
  },
  'post /user': {
    controller: 'user',
    action: 'create'
  },
  'put /user': {
    controller: 'user',
    action: 'update'
  },
  'delete /user': {
    controller: 'user',
    action: 'destroy'
  },
  '/userProfile/:id?': {
    controller: 'user',
    action: 'userProfile'
  },
  'put /userProfile/:id': {
    controller: 'user',
    action: 'userProfile'
  },
  // Register Meal Conttroler
  'get /registermeal': {
    controller: 'registermeal',
    action: 'index'
  },
  'get /registermealAd': {
    controller: 'registermeal',
    action: 'indexAdmin'
  },
  'get /registermeal/:id': {
    controller: 'registermeal',
    action: 'find'
  },
  'post /registermeal': {
    controller: 'registermeal',
    action: 'create'
  },
  'post /registermeal/searchByDay': {
    controller: 'registermeal',
    action: 'searchByDay'
  },
  'put /registermeal/:id': {
    controller: 'registermeal',
    action: 'update'
  },
  'delete /registermeal/:id': {
    controller: 'registermeal',
    action: 'destroy'
  },
  'post /searchRegisterMeal': {
    controller: 'registermeal',
    action: 'indexAdminSearch'
  },
  // menu Controller
  'get /menu': {
    controller: 'menu',
    action: 'index'
  },
  'get /menu/:id': {
    controller: 'menu',
    action: 'find'
  },
  'post /menu': {
    controller: 'menu',
    action: 'create'
  },
  'put /menu/:id': {
    controller: 'menu',
    action: 'update'
  },
  'delete /menu/:id': {
    controller: 'menu',
    action: 'destroy'
  },
   // Suggest Controller
  'get /suggest': {
    controller: 'menu',
    action: 'getSuggest'
  },
  'post /suggest': {
    controller: 'menu',
    action: 'createSuggest'
  },
  'delete /suggest/:id': {
    controller: 'menu',
    action: 'deleteSuggest'
  },
  // expense Controller
  'get /expense/:id?': {
    controller: 'expense',
    action: 'find'
  },
  'post /expense': {
    controller: 'expense',
    action: 'create'
  },
  'put /expense/:id': {
    controller: 'expense',
    action: 'update'
  },
  'delete /expense/:id': {
    controller: 'expense',
    action: 'destroy'
  },
  // deposit Controller
  'get /deposit/:id?': {
    controller: 'deposit',
    action: 'find'
  },
  'post /deposit': {
    controller: 'deposit',
    action: 'create'
  },
  'put /deposit/:id': {
    controller: 'deposit',
    action: 'update'
  },
  'delete /deposit/:id': {
    controller: 'deposit',
    action: 'destroy'
  },
  // Search Controller
  'post /search': {
    controller: 'search',
    action: 'index'
  },
  // Mail Controller
  'post /mail': {
    controller: 'mail',
    action: 'sendMail'
  },
   // mealhistory Controller
  'get /mealhistory/:id?': {
    controller: 'mealhistory',
    action: 'find'
  },
  'get /mealhistoryadmin': {
    controller: 'mealhistory',
    action: 'indexAdmin'
  },
  'post /mealhistory':{
    controller: 'mealhistory',
    action: 'create'
  }
};