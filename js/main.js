// Cargar las tareas o inicializar
let lista_tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const botonesFiltro = document.querySelectorAll(".filtros button");

let filtroActual = "todos";

// Mostrar tareas según el filtro
function mostrar_tareas() {
  todoList.innerHTML = "";

  let tareasFiltradas = lista_tareas.filter((tarea) => {
    if (filtroActual === "pendientes") return !tarea.completada;
    if (filtroActual === "completadas") return tarea.completada;
    return true;
  });

  tareasFiltradas.forEach((tarea, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.addEventListener("change", () => {
      tarea.completada = checkbox.checked;
      mostrar_tareas();
    });

    const span = document.createElement("span");
    span.textContent = tarea.texto;
    if (tarea.completada) {
      span.classList.add("completada");
    }

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminar_tarea(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnEliminar);
    todoList.appendChild(li);
  });

  guardar_en_localstorage();
  actualizar_estilos_filtro();
}

function guardar_en_localstorage() {
  localStorage.setItem("tareas", JSON.stringify(lista_tareas));
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevaTareaTexto = todoInput.value.trim();
  if (nuevaTareaTexto) {
    lista_tareas.push({ texto: nuevaTareaTexto, completada: false });
    todoInput.value = "";
    mostrar_tareas();
  }
});

function eliminar_tarea(indice) {
  lista_tareas.splice(indice, 1);
  mostrar_tareas();
}

// Cambiar el filtro al hacer click
botonesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroActual = btn.dataset.filtro;
    mostrar_tareas();
  });
});

// Actualiza el estilo del botón activo
function actualizar_estilos_filtro() {
  botonesFiltro.forEach((btn) => {
    btn.classList.remove("activo");
    if (btn.dataset.filtro === filtroActual) {
      btn.classList.add("activo");
    }
  });
}

// Inicializar
mostrar_tareas();
