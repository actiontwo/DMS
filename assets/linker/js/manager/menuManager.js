//Declare Model
var MenuManagerModel = Backbone.Model.extend({
  urlRoot: "/menu"
});
//Declare Collection
var MenuManagerCollection = Backbone.Collection.extend({
  url: "/menu",
  model: MenuManagerModel
});
var dish;
var MenuManagerView = Backbone.View.extend({
  model: new MenuManagerModel,
  collection: new MenuManagerCollection,
  tagName: 'div',
  className: 'menus',
  id: 'dish_menu',
  initialize: function(){
    this.listenTo(this.collection, 'reset change add remove', this.render);
    $.get('/dish', function(data){
        dish = [];
        for(var i = 0; i<data.length; i++){
          dish.push(data[i].dish)
        }        
    });
  },
  render: function(){
    console.log(dish);
    this.$el.html(Templates['admin/Manager/menuManager'](this.collection));
    autoComplete($('.txt-dish-create'), dish);
    initDatePicker($('.datepicker'));    
    this.delegateEvents({
      'click .saveDish': 'saveDish',
      'click .edit-menu': 'editMenu',
      'click .save-menu': 'saveMenu',
      'click .add-menu': 'addMenu',
      'click .delete-menu': 'deleteMenu',
    })
    return this;  
  },
  saveDish: function(){
    var dish = $('.dishname').val();
    var note = $('.dishnote').val();
    console.log(dish);
    var data = {
      dish: dish,
      note: note
    };
    console.log(data);
    this.model.urlRoot = '/dish';
    this.model.save(data, {
      success: function(model, res){
        console.log(res);
      },
      error: function(model, err){
        console.log(err);
      }
    });
    this.model.urlRoot = '/menu';
    $('.dishname').val('');
    $('.dishnote').val('')
  },
  editMenu: function(el){
    var ev = $(el.currentTarget);
    var id = ev.parents('tr').data('id');
    console.log(id);
    this.collection.get(ev.parents('tr').data('id')).set({edit: true, update: true });

    // var dishEdit = [];
    //   $('.dishEdit').find('input.txt-dish-create').each(function(){
    //     dishEdit.push($(this).val());
    //   })
    // var data = {
    //   edit: true,
    //   update: true,
    //   date: $('.input-date-create').val(),
    //   brunch: $('.select-brunch').val(),
    //   dish: dishEdit,
    //   note: $('.txt-note-create').val()
    // }
    // console.log(data);
  },
  saveMenu: function(el){
    // var ev = $(el.currentTarget);
    // var dishs = [];
    // ev.parents('tr').find('.dish-loop').each(function(){
    //   dishs.push($(this).val());
    // })
    // var data = {
    //   edit: false,
    //   date: ev.parents('tr').find('.txt-date').val(),
    //   brunch: ev.parents('tr').find('.sel-brunch').val(),
    //   dish:dishs,
    //   note: ev.parents('tr').find('.txt-note').val()
    // }
    // console.log(data);
    // var model = this.collection.get(ev.parents('tr').data('id')).set(data);
    // if(model.attributes.new){
    //   delete model.attributes.id;
    // }
    // model.save();

    var ev = $(el.currentTarget);
    var dishEdit = [];
      $('.dishEdit').find('input.txt-dish-create').each(function(){
        dishEdit.push($(this).val());
      })
    var data = {
      date: $('.input-date-create').val(),
      brunch: $('.select-brunch').val(),
      dish: dishEdit,
      note: $('.txt-note-create').val()
    }
    console.log(data);
    var model = this.collection.get(ev.parents('tr').data('id')).set(data);
    if(model.attributes.new){
      delete model.attributes.id;
    }
    model.save();
  },
  addMenu: function(){ 
    var dishGroup = [];
    $('.txt-dish-create').each(function(){
      dishGroup.push($(this).val());
    });
    var data = {
      date: $('.input-date-create').val(),
      brunch: $('.select-brunch').val(),
      dish: dishGroup,
      note: $('.txt-note-create').val(),
    };
    console.log(data);
     var model =  this.collection.add(data);
     model.save();
  },
  deleteMenu: function(el){
    var ev = $(el.currentTarget);
    var id = ev.parents('tr').data('id');
    console.log(id);
    this.collection.get(id).destroy();
  }
})