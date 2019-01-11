// service, factory, provider

// 본 프로젝트에서는 factory를 이용해 service를 만듬
angular.module('todo').factory('todoStorage', function () {
  // if variable is capital, ㅍvariable is constant
  var TODO_DATA = 'TODO_DATA';
  
  var storage = {
    // todo ...
    
    todos: [],
    
    // if variable has _(under bar), it's private variable
    _saveToLocalStorage: function (data) {
      localStorage.setItem(TODO_DATA, JSON.stringify(data));
    },
    
    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(TODO_DATA)) || [];
    },
    
    get: function () {
      // storage.todos = storage._getFromLocalStorage()
      angular.copy(storage._getFromLocalStorage(), storage.todos);
      return storage.todos;
    },
    
    remove: function (todo) {
      // find todo index in todos
      var idx = storage.todos.findIndex(function (item) {
        return item == todo;
      });
      
      // remove from todos
      if (idx > -1) {
        storage.todos.splice(idx, 1);
        storage._saveToLocalStorage(storage.todos);
      }
    },
    
    add: function (newTodoTitle) {
      // create new todo
      var newTodo = {
        title: newTodoTitle,
        completed: false,
        createdAt: Date.now()
      };
      
      // push into todos
      storage.todos.push(newTodo);
      storage._saveToLocalStorage(storage.todos);
    },
    
    update: function () {
      storage._saveToLocalStorage(storage.todos);
    }
  }
  
  return storage;
});
