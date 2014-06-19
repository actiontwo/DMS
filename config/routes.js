/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
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

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  // 
  // (This would also work if you had a file at: `/views/home.ejs`)
  '/': {
    //view: 'site/index'
    controller: 'main'
  },
  '/success': {
    controller: 'main',
    action: 'success'
  },
  'get /manager/:id?': {
    controller: 'main',
    action: 'find'
  },
  'put /manager/:id': {
    controller: 'main',
    action: 'manager'
  },
  '/roleCheck': {
    controller: 'user',
    action: 'roleCheck'
  },
  // User Controller
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
  '/userProfile/:id?':{
    controller:'user',
    action:'userProfile'
  },
  'put /userProfile/:id':{
    controller:'user',
    action:'userProfile'
  },
  // Register Meal Conttroler
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
  'put /registermeal/:id': {
    controller: 'registermeal',
    action: 'update'
  },
  'delete /registermeal/:id': {
    controller: 'registermeal',
    action: 'destroy'
  },
  // Menu Controller
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
  // Dish Controller
  'get /dish':{
    controller: 'menu',
    action: 'getDish'
  },
  'post /dish':{
    controller: 'menu',
    action: 'createDish'
  },
  // Expense Controller
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
  // Deposit Controller
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
  // Report Controller
  'get /report/:id?': {
    controller: 'report',
    action: 'find'
  },
  'post /report': {
    controller: 'report',
    action: 'create'
  },
  'put /report/:id': {
    controller: 'report',
    action: 'update'
  },
  'delete /report/:id': {
    controller: 'report',
    action: 'destroy'
  },
  // Search Controller
  'post /search': {
    controller: 'search',
    action: 'index'
  }
  /*
   // But what if you want your home page to display
   // a signup form located at `views/user/signup.ejs`?
   '/': {
   view: 'user/signup'
   }


   // Let's say you're building an email client, like Gmail
   // You might want your home route to serve an interface using custom logic.
   // In this scenario, you have a custom controller `MessageController`
   // with an `inbox` action.
   '/': 'MessageController.inbox'


   // Alternatively, you can use the more verbose syntax:
   '/': {
   controller: 'MessageController',
   action: 'inbox'
   }


   // If you decided to call your action `index` instead of `inbox`,
   // since the `index` action is the default, you can shortcut even further to:
   '/': 'MessageController'


   // Up until now, we haven't specified a specific HTTP method/verb
   // The routes above will apply to ALL verbs!
   // If you want to set up a route only for one in particular
   // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
   // For example, if you have a `UserController` with a `signup` action,
   // and somewhere else, you're serving a signup form looks like:
   //
   //    <form action="/signup">
   //      <input name="username" type="text"/>
   //      <input name="password" type="password"/>
   //      <input type="submit"/>
   //    </form>

   // You would want to define the following route to handle your form:
   'post /signup': 'UserController.signup'


   // What about the ever-popular "vanity URLs" aka URL slugs?
   // (you might remember doing this with `mod_rewrite` in Apache)
   //
   // This is where you want to set up root-relative dynamic routes like:
   // http://yourwebsite.com/twinkletoez
   //
   // NOTE:
   // You'll still want to allow requests through to the static assets,
   // so we need to set up this route to ignore URLs that have a trailing ".":
   // (e.g. your javascript, CSS, and image files)
   'get /*(^.*)': 'UserController.profile'

   */
};

/**
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *      `module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *    /foo/find/:id?  ->  search lampshades using specified criteria or with id=:id
 *
 *    /foo/create   ->  create a lampshade using specified values
 *
 *    /foo/update/:id ->  update the lampshade with id=:id
 *
 *    /foo/destroy/:id  ->  delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *    `module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *    get /foo/:id? ->  search lampshades using specified criteria or with id=:id
 *
 *    post /foo   -> create a lampshade using specified values
 *
 *    put /foo/:id  ->  update the lampshade with id=:id
 *
 *    delete /foo/:id ->  delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
