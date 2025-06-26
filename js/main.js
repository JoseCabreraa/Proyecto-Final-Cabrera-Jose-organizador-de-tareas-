//Funciones

function mostrar_tareas(lista_de_tareas) {
  console.log("Lista de Tareas: ");
  for (let i = 0; i < lista_de_tareas.length; i++) {
    console.log(lista_de_tareas[i]);
  }
}

function eliminar_tarea(numero_de_tarea, lista_de_tareas) {
  if (numero_de_tarea >= 0 && numero_de_tarea < lista_de_tareas.length) {
    lista_de_tareas.splice(numero_de_tarea, 1);
    console.log("Tarea Eliminada");
  } else {
    console.log("Indice Invalido");
  }
  mostrar_tareas(lista_de_tareas);
}

function agregar_tarea(lista_de_tareas, tarea_nueva) {
  lista_de_tareas.push(tarea_nueva);
  console.log("Tarea Agregada");
  mostrar_tareas(lista_de_tareas);
}

function tareas_pendientes(lista_de_tareas) {
  if (lista_de_tareas.length === 0) {
    console.log("No hay Tareas Pendientes");
  } else {
    console.log("Quedan Tareas Pendientes");
  }
}
// Array con las Tareas
let lista_tareas = [
  "Estudiar",
  "Lavar ropa",
  "Cocinar",
  "Tender la cama",
  "Entrenar",
];

// Llamados a las funciones

mostrar_tareas(lista_tareas);
agregar_tarea(lista_tareas, "leer 30 min");
eliminar_tarea(2, lista_tareas);
tareas_pendientes(lista_tareas);
