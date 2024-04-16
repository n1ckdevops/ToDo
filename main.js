const todoControll = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
let toDoData = [];

const saveDataToLocalStorage = function () {
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
  console.log("save data to local storage");
};

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
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      saveDataToLocalStorage();
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      const index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      saveDataToLocalStorage();
      render();
    });
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("toDoData");
  if (storedData) {
    toDoData = JSON.parse(storedData);
    render();
  }
});

todoControll.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value.trim() !== "") {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo);
    headerInput.value = "";
    saveDataToLocalStorage();
    render();
  }
});
