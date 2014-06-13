var role;
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'registerMealRender',
    'menu': 'menuRender',
    'expense': 'expenseRender',
    'deposit': 'depositRender',
    'report': 'reportRender'
  },
  initialize: function () {
    this.registerMealView = new RegisterMealView({
      collection: new RegisterMealCollection,
      model: new RegisterMealModel
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
    this.reportView = new ReportView({
      collection: new ReportCollection
    });
    if (role === "admin") {
      this.registerMealAdView = new RegisterMealAdView({
        collection: new RegisterMealAdCollection
      })
    }
  },
  registerMealRender: function () {
    this.registerMealView.collection.fetch({reset: true});
    $('#main').html(this.registerMealView.el);
    console.log(role);
    if(role === 'admin'){
      this.registerMealAdView.collection.fetch({reset: true});
      $('#subMain').html(this.registerMealAdView.el);
    }
  },
  menuRender: function () {
     this.menuView.collection.fetch({reset:true});
    $('#subMain').html("");
    $('#main').html(this.menuView.el);
  },
  expenseRender: function () {
    this.expenseView.collection.fetch({reset:true});
    $('#subMain').html("");
    $('#main').html(this.expenseView.render().el);
    initDatePicker($('.datepicker'));
  },
  depositRender: function () {
    this.depositView.collection.fetch();
    $('#main').html(this.depositView.render().el);
    $('#subMain').html("");
    initDatePicker($('.datepicker'));
  },
  reportRender: function () {
    $('#main').html(this.reportView.render().el);
    $('#subMain').html("");
    initDatePicker($('.datepicker'));
  }
});
var appRouter;
$.get('/roleCheck', function (data) {
  role = data;
  appRouter = new AppRouter();
  Backbone.history.start();
});

