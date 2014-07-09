var role;
var AppRouter = Backbone.Router.extend({
  routes: {
    'config': 'configRender',
    'users': 'usersRender',
    'deposit': 'depositRender',
    'registerMeal': 'registerMealRender',
    'menu': 'menuRender',
    'mealHistory': 'mealHistoryRender'
  },
  initialize: function () {
    this.configView = new ConfigView();
    this.usersView = new UsersView();
    this.depositView = new DepositView();
    this.registerMealView = new RegisterMealView();
    this.menuView = new MenuView();
    this.mealHistoryView = new MealHistoryView();
  },
  configRender: function () {
    this.configView.model.fetch();
    $('#main').html(this.configView.el);
  },
  usersRender: function () {
    this.usersView.collection.fetch({reset: true});
    $('#main').html(this.usersView.el);
  },
  depositRender: function () {
    this.depositView.collection.fetch({reset: true});
    $('#main').html(this.depositView.el);
  },
  registerMealRender: function () {
    this.registerMealView.collection.fetch({reset: true});
    $('#main').html(this.registerMealView.el);
  },
  menuRender: function () {
    this.menuView.collection.fetch({reset: true});
    $('#main').html(this.menuView.el);
  },
  mealHistoryRender: function () {
    this.mealHistoryView.collection.fetch({reset: true});
    $('#main').html(this.mealHistoryView.el);
  }
});
var appRouter = new AppRouter();
Backbone.history.start();
