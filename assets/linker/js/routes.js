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
    })
  },
  registerMealRender: function () {
    this.registerMealView.collection.fetch({reset:true});
    $('#main').html(this.registerMealView.el);
  },
  menuRender: function () {
     this.menuView.collection.fetch({reset:true});
    $('#main').html(this.menuView.el);
  },
  expenseRender: function () {
    this.expenseView.collection.fetch({reset:true});
    $('#main').html(this.expenseView.render().el);
  },
  depositRender:function(){
    this.depositView.collection.fetch();
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
