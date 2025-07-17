// Cargar tareas de LocalStorage o lista vacía
let lista_tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Elementos del DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Mostrar tareas en el DOM
function mostrar_tareas() {
  todoList.innerHTML = "";
  lista_tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = tarea;

    // Botón Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminar_tarea(index);

    li.appendChild(btnEliminar);
    todoList.appendChild(li);
  });

  guardar_en_localstorage();
}

// Guardar
function guardar_en_localstorage() {
  localStorage.setItem("tareas", JSON.stringify(lista_tareas));
}

// Funcion agregar tarea
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaTarea = todoInput.value.trim();
  if (nuevaTarea) {
    lista_tareas.push(nuevaTarea);
    todoInput.value = "";
    mostrar_tareas();
  }
});

// Funcion eliminar tarea
function eliminar_tarea(indice) {
  if (indice >= 0 && indice < lista_tareas.length) {
    lista_tareas.splice(indice, 1);
    mostrar_tareas();
  }
}

// Inicializar
mostrar_tareas();
