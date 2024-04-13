const todoControll = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
// отрисовывать будет перебором определенный массив
// создаем массов в виде обьектов в котором будет хранить каждую
// тудушку
const toDoData = [];
// отрисовывает тудушки
const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove">"</button>' +
      '<button class="todo-complete"></button>' +
      "</div>;";
    if (item.completed && headerInput.value !== "") {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    console.log(headerInput.value);
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
  });
};
todoControll.addEventListener("submit", function (event) {
  event.preventDefault();
  const newToDo = {
    text: headerInput.value,
    completed: false,
  };
  toDoData.push(newToDo);
  headerInput.value = "";
  render();
});
