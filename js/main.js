let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtroActual = "todos"; // valores que pueded tomar: "todos", "pendientes" , "completadas"
let indiceEditando = null; // índice de tarea que se está editando

// Manejo de almacenamiento

export function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

export function cargarTareasDesdeJSON(callback) {
  if (tareas.length > 0) {
    callback();
    return;
  }

  fetch("data/tareas.json")
    .then((respuesta) => {
      if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");
      return respuesta.json();
    })
    .then((data) => {
      tareas = data;
      guardarTareas();
      callback();
    })
    .catch((error) => {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar las tareas", "error");
    });
}

// Funciones para las tareas
export function obtenerTareasFiltradas() {
  return tareas.filter((tarea) => {
    if (filtroActual === "pendientes") return !tarea.completada;
    if (filtroActual === "completadas") return tarea.completada;
    return true;
  });
}

export function agregarTarea(titulo, descripcion, prioridad) {
  const nuevaTarea = { titulo, descripcion, prioridad, completada: false };
  tareas.push(nuevaTarea);
  guardarTareas();
}

export function editarTarea(indice, titulo, descripcion, prioridad) {
  tareas[indice] = { ...tareas[indice], titulo, descripcion, prioridad };
  guardarTareas();
}

export function eliminarTarea(indice) {
  tareas.splice(indice, 1);
  guardarTareas();
}

export function toggleCompletada(indice) {
  tareas[indice].completada = !tareas[indice].completada;
  guardarTareas();
}

// Leer o modificar Tareas

export function setFiltro(nuevoFiltro) {
  filtroActual = nuevoFiltro;
}

export function getFiltro() {
  return filtroActual;
}

export function setEditando(indice) {
  indiceEditando = indice;
}

export function getEditando() {
  return indiceEditando;
}

export function resetEditando() {
  indiceEditando = null;
}
