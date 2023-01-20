// Assign To Dom
const addItemButton = document.querySelector(".addItemButton");
const categoryContainer = document.querySelector(".categoryContainer");
const categoryIcons = document.querySelectorAll(".categoryContainer i");
const input = document.querySelector("input");
const todoContainer = document.querySelector(".todoContainer ul");
const errorMessage = document.querySelector(".errorMessage");

// EventListener
addItemButton.addEventListener("click", (ev) => {
  if (input.value === "") errorMessage.classList.toggle("turnonError");
  else {
    errorMessage.classList.remove("turnonError");
    categoryContainer.classList.toggle("add");
    addItemButton.classList.toggle("rotate");
  }
});

categoryIcons.forEach((icon) => {
  icon.addEventListener("click", (ev) => {
    categoryContainer.classList.toggle("add");
    const IconClass = [`${icon.classList[1]}`, `${icon.classList[2]}`];
    addItemButton.classList.toggle("rotate");
    addItem(input.value, IconClass);
    input.value = "";
  });
});
todoContainer.addEventListener("click", optionTodo);
document.addEventListener("DOMContentLoaded", getTodo);
document.addEventListener("DOMContentLoaded", search);

// Function
function addItem(text, icon, isSave = true) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todoItem");
  todoItem.innerHTML = `
    <li>${text}</li>
    <i class="fa-duotone fa-shield-check" onclick="doneClick(this)"></i>
     <i class="fa-duotone fa-file-edit" onclick="editClick(this)"></i>
     <i class="fa-duotone fa-trash" onclick="del(this)"></i>
    `;
  const catIcon = document.createElement("i");
  catIcon.classList.add("fad");
  catIcon.classList.add(icon[0]);
  catIcon.classList.add(icon[1]);
  todoContainer.appendChild(todoItem);
  todoItem.insertBefore(catIcon, todoItem.childNodes[1]);
  const bgColor =
    getComputedStyle(catIcon).getPropertyValue("background-color");
  todoItem.style.background = bgColor;
  if (isSave) savaTodo(text, icon);
}

function optionTodo(event) {
  const iconTargeted = event.target.classList[1];
  const parentTargeted = event.target.parentNode;
  if (iconTargeted === "fa-trash") parentTargeted.remove();
  else if (iconTargeted === "fa-file-edit") {
    parentTargeted.childNodes[2].toggleAttribute("contenteditable");
    parentTargeted.classList.toggle("editing");
  }
}

function savaTodo(text, icon) {
  const todoList = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  let todoItemLocal = {
    text,
    icon,
    isDone: false,
  };
  todoList.push(todoItemLocal);
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function getTodo() {
  const todoList = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  todoList.forEach((todo) => {
    addItem(todo.text, todo.icon, (isSave = false));
  });
}

function doneClick(event) {
  const shield = event.parentNode;
  const local = JSON.parse(localStorage.getItem("todo"));
  for (const d of local) {
    if (d.text == shield.childNodes[2].innerHTML) {
      if (shield.classList.contains("completed")) {
        d.isDone = false;
        shield.classList.remove("completed");
        localStorage.setItem("todo", JSON.stringify(local));
      } else {
        d.isDone = true;
        shield.classList.add("completed");
        localStorage.setItem("todo", JSON.stringify(local));
      }
    }
  }
}

function search() {
  const pLoad = document.querySelectorAll(".todoItem");
  const local = JSON.parse(localStorage.getItem("todo"));
  for (const x of pLoad) {
    const divText = x.childNodes[2].innerHTML;
    for (const y of local) {
      if (y.text == divText) {
        if (y.isDone == true) x.classList.add("completed");
      }
    }
  }
}

function del(event) {
  const trash = event.parentNode;
  const local = JSON.parse(localStorage.getItem("todo"));
  const index = local.findIndex(
    (item) => item.text === trash.childNodes[2].innerHTML
  );
  local.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(local));
}

function editClick(event) {
  const liDiv = event.parentNode.childNodes[1].classList[2]
  const local = JSON.parse(localStorage.getItem("todo"));
  for (const e of local) {
    if (e.icon[1] == liDiv) {
      e.text = event.parentNode.childNodes[2].innerHTML
      localStorage.setItem("todo", JSON.stringify(local));
    }
  }
}
