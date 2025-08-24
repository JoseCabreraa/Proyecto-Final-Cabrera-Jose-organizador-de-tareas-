import {
  guardarTareas,
  cargarTareasDesdeJSON,
  obtenerTareasFiltradas,
  agregarTarea,
  editarTarea,
  eliminarTarea,
  toggleCompletada,
  setFiltro,
  getFiltro,
  setEditando,
  getEditando,
  resetEditando,
} from "./main.js";

// Elementos del DOM
const form = document.getElementById("todo-form");
const inputTitulo = document.getElementById("todo-titulo");
const inputDescripcion = document.getElementById("todo-descripcion");
const inputPrioridad = document.getElementById("todo-prioridad");
const listaTareas = document.getElementById("todo-list");
const botonesFiltro = document.querySelectorAll(".filtros button");

// Inicialización
cargarTareasDesdeJSON(renderizarTareas);

// Renderizado de tareas

function renderizarTareas() {
  const tareas = obtenerTareasFiltradas();
  listaTareas.innerHTML = "";

  // Mensaje cuando no hay tareas
  if (tareas.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay tareas para mostrar";
    li.classList.add("mensaje-vacio");
    listaTareas.appendChild(li);
    return;
  }

  // Crear un <li> por cada tarea
  tareas.forEach((tarea, indice) => {
    const li = document.createElement("li");

    // Checkbox para marcar completada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completada;
    checkbox.addEventListener("change", (eventoCheckbox) => {
      toggleCompletada(indice);
      renderizarTareas();
    });

    // Texto de la tarea
    const texto = document.createElement("span");
    const titulo = document.createElement("strong");
    titulo.textContent = tarea.titulo;
    texto.appendChild(titulo);
    texto.appendChild(
      document.createTextNode(` - ${tarea.descripcion} [${tarea.prioridad}]`)
    );
    if (tarea.completada) texto.classList.add("completada");

    // Botón editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");
    btnEditar.addEventListener("click", (eventoEditar) => {
      inputTitulo.value = tarea.titulo;
      inputDescripcion.value = tarea.descripcion;
      inputPrioridad.value = tarea.prioridad;
      setEditando(indice);
    });

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("eliminar");
    btnEliminar.addEventListener("click", (eventoEliminar) => {
      Swal.fire({
        title: "¿Eliminar esta tarea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((resultado) => {
        if (resultado.isConfirmed) {
          eliminarTarea(indice);
          renderizarTareas();
          Swal.fire("Eliminada", "La tarea fue eliminada", "success");
        }
      });
    });

    // Armar el <li>
    li.appendChild(checkbox);
    li.appendChild(texto);
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
}

// Eventos

// Enviar formulario
form.addEventListener("submit", (eventoFormulario) => {
  eventoFormulario.preventDefault(); // Evita que el formulario recargue la página

  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const prioridad = inputPrioridad.value;

  if (!titulo || !descripcion) {
    Swal.fire("Atención", "Completa todos los campos", "warning");
    return;
  }

  const indice = getEditando();
  if (indice !== null) {
    editarTarea(indice, titulo, descripcion, prioridad);
    resetEditando();
    Swal.fire("Listo", "Tarea editada", "success");
  } else {
    agregarTarea(titulo, descripcion, prioridad);
    Swal.fire("Bien", "Tarea agregada", "success");
  }

  form.reset();
  renderizarTareas();
});

// Filtros
botonesFiltro.forEach((botonFiltro) => {
  botonFiltro.addEventListener("click", (eventoBoton) => {
    setFiltro(botonFiltro.dataset.filtro);
    actualizarBotonesFiltro();
    renderizarTareas();
  });
});

// Actualiza el estilo visual de los botones
function actualizarBotonesFiltro() {
  const filtroActual = getFiltro();
  botonesFiltro.forEach((botonFiltro) => {
    botonFiltro.classList.toggle(
      "activo",
      botonFiltro.dataset.filtro === filtroActual
    );
  });
}
