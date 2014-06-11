var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'registerMealRender',
    'menu': 'menuRender',
    'expense': 'expenseRender',
    'deposit':'depositRender',
    'report':'reportRender'
  },
  initialize: function () {
    this.registerMealView = new RegisterMealView({
      collection: new RegisterMealCollection
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
    })
  },
  registerMealRender: function () {
    this.registerMealView.collection.fetch({reset:true});
    $('#main').html(this.registerMealView.el);
    initDatePicker($('.datepicker'));
  },
  menuRender: function () {
    $('#main').html(this.menuView.render().el);
  },
  expenseRender: function () {
    $('#main').html(this.expenseView.render().el);
  },
  depositRender:function(){
    $('#main').html(this.depositView.render().el);
    initDatePicker($('.datepicker'));
  },
  reportRender:function(){
    $('#main').html(this.reportView.render().el);
    initDatePicker($('.datepicker'));
  }
});

var appRouter = new AppRouter();
Backbone.history.start();
