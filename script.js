if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  function ready() {
    fetchTodos();
    let addBtn = locateById("add");
    let removeBntn = locateById('remove');
    addBtn.addEventListener("click", addTodo);
    remove.addEventListener('click', removeTodos)
    document.addEventListener("keypress", checkKeyPress);
    document.body.addEventListener('click', updateState)
  }
  function checkKeyPress(event) {
    if (event.keyCode == 13) {
      addTodo();
    }
  }

  function removeTodos() {
    let list = document.getElementById('todo-list');
    let len = list.children.length;
    for (let i = 0; i < len; i += 1) {
      let curChild = list.children[i];
      if (curChild.classList.contains('doneTodo')) {
        curChild.remove();
        len -= 1;
        i = 0;
      }
    }
    if (list.children[0]) {

      if (list.children[0].classList.contains('doneTodo')) {
        list.children[0].remove()
      }
    }
    storeTodos();
  }
  function fetchTodos() {
    let todos = []
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem('todos'))
    }
    let len = todos.length;
    if (len > 0) {
      let list = locateById("todo-list");
      for (let i = 0; i < len; i++) {
        let newItem = document.createElement("li");
        newItem.className = "list-item";
        if (todos[i].isDone === true) {
          newItem.classList.add('doneTodo');
        }
        newItem.innerHTML = `${todos[i].text}`;
        list.appendChild(newItem);
      }
      storeTodos();
    }
  }
  function addTodo() {
    let newItem = document.createElement("li");
    newItem.className = "list-item";
    let item = {};

    if (locateById("todo").value !== "") {
      item.text = locateById("todo").value;
      item.isDone = false;
      newItem.innerHTML = `${item.text}`;
      let list = locateById("todo-list");
      list.insertBefore(newItem, list.firstChild);
      locateById("todo").value = "";
      storeTodos();
    } else {
      alert("Enter a To do First");
    }
  }

  function storeTodos() {
    let list = locateById("todo-list");
    let len = list.children.length;
    let listArr = [];
    for (let i = 0; i < len; i++) {
      let todo = {};
      todo.text = list.children[i].textContent;
      if (list.children[i].classList.contains('doneTodo'))
        todo.isDone = true;
      else
        todo.isDone = false;
      listArr.push(todo);
    }
    localStorage.setItem("todos", JSON.stringify(listArr));
  }

  function updateState(e) {
    if (e.target.classList.contains('doneTodo')) {
      e.target.classList.remove('doneTodo');
      e.target.remove();
      // locateById('todo-list').appendChild(e.target)
      let list = locateById('todo-list');
      list.insertBefore(e.target, list.childNodes[0]);
      storeTodos();

    }
    else if (e.target.classList.contains('list-item')) {
      e.target.classList.add('doneTodo')
      e.target.remove();
      locateById('todo-list').appendChild(e.target)

      storeTodos();
    }

  }
  function locateById(id) {
    return document.getElementById(id);
  }