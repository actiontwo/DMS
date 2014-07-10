var role;
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'registerMealRender',
    'menu': 'menuRender',
    'expense': 'expenseRender',
    'deposit': 'depositRender',
    'userProfile': 'userProfile',
    'manager': 'managerRender',
    'suggest': 'suggest',
    'mealHistory': 'mealHistory',
    'mealHistoryManager': 'mealHistoryManagerView'
  },
  initialize: function () {
    this.registerMealView = new RegisterMealView({
      collection: new RegisterMealCollection(),
      model: new RegisterMealModel()
    });
    this.menuView = new MenuView({
      collection: new MenuCollection
    });
    this.expenseView = new ExpenseView({
      collection: new ExpenseCollection
    });
    this.depositView = new DepositView({
      collection: new DepositCollection
    });
    this.userView = new UserView({
      model: new UserModel()
    });
    this.suggestView = new SuggestView({
      collection: new SuggestCollection
    });
    this.mealHistoryView = new MealHistoryView({
      collection: new MealHistoryCollection
    });
  },
  registerMealRender: function () {
    this.registerMealView.collection.fetch({reset: true});
    $('#main').html(this.registerMealView.el);
  },
  menuRender: function () {
    this.menuView.collection.fetch({reset: true});
    $('#subMain').html("");
    $('#main').html(this.menuView.el);
  },
  expenseRender: function () {
    this.expenseView.collection.fetch({reset: true});
    $('#subMain').html("");
    $('#main').html(this.expenseView.render().el);
  },
  depositRender: function () {
    this.depositView.collection.fetch();
    $('#main').html(this.depositView.render().el);
    $('#subMain').html("");
    initDatePicker($('.datepicker'));
  },
  userProfile: function () {
    this.userView.model.fetch();
    $('#main').html(this.userView.el);
  },
  suggest: function () {
    this.suggestView.collection.fetch();
    $('#main').html(this.suggestView.render().el);
  },
  mealHistory: function () {
    this.mealHistoryView.collection.fetch();
    $('#main').html(this.mealHistoryView.render().el);
  }
});
var appRouter = new AppRouter();
Backbone.history.start();


