//variables y constantes principales
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "todos";
let editando = null;

const form = document.getElementById("todo-form");
const titulo = document.getElementById("todo-titulo");
const descripcion = document.getElementById("todo-descripcion");
const prioridad = document.getElementById("todo-prioridad");
const lista = document.getElementById("todo-list");
const botones = document.querySelectorAll(".filtros button");

// Cargo las tareas desde el JSON si no hay en localStorage
function cargarTareas() {
  fetch("data/tareas.json")
    .then(function (res) {
      if (!res.ok) throw new Error("No se pudo cargar");
      return res.json();
    })
    .then(function (data) {
      if (tareas.length === 0) {
        tareas = data;
        guardar();
      }
      mostrar();
    })
    .catch(function (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar las tareas", "error");
    });
}

// Mostrar tareas en el HTML según filtro
function mostrar() {
  const filtradas = tareas.filter(function (t) {
    if (filtro === "pendientes") return !t.completada;
    if (filtro === "completadas") return t.completada;
    return true;
  });

  lista.innerHTML = filtradas
    .map(function (t, i) {
      return `
    <li>
      <input type="checkbox" ${
        t.completada ? "checked" : ""
      } onchange="toggleCompletada(${i})">
      <span class="${t.completada ? "completada" : ""}">
        <strong>${t.titulo}</strong> - ${t.descripcion} [${t.prioridad}]
      </span>
      <button class="editar" onclick="editar(${i})">Editar</button>
      <button class="eliminar" onclick="eliminar(${i})">Eliminar</button>
    </li>
  `;
    })
    .join("");

  actualizarBotones();
  guardar();
}

// Guardar tareas
function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Agregar o editar tarea al enviar el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!titulo.value.trim() || !descripcion.value.trim()) {
    Swal.fire("Atención", "Completa todos los campos", "warning");
    return;
  }

  if (editando !== null) {
    tareas[editando].titulo = titulo.value.trim();
    tareas[editando].descripcion = descripcion.value.trim();
    tareas[editando].prioridad = prioridad.value;
    editando = null;
    Swal.fire("Listo", "Tarea editada", "success");
  } else {
    tareas.push({
      titulo: titulo.value.trim(),
      descripcion: descripcion.value.trim(),
      prioridad: prioridad.value,
      completada: false,
    });
    Swal.fire("Bien", "Tarea agregada", "success");
  }

  form.reset();
  mostrar();
});

// Cambiar estado de la tarea a completada/no completada
function toggleCompletada(i) {
  tareas[i].completada = !tareas[i].completada;
  mostrar();
}

// Editar tarea: carga datos al formulario
function editar(i) {
  titulo.value = tareas[i].titulo;
  descripcion.value = tareas[i].descripcion;
  prioridad.value = tareas[i].prioridad;
  editando = i;
}

// Eliminar tarea con confirmación con una animacion fachera
function eliminar(i) {
  Swal.fire({
    title: "¿Eliminar esta tarea?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then(function (resultado) {
    if (resultado.isConfirmed) {
      tareas.splice(i, 1);
      mostrar();
      Swal.fire("Eliminada", "Tarea eliminada", "success");
    }
  });
}

// Cambiar filtro al hacer click
botones.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filtro = btn.dataset.filtro;
    mostrar();
  });
});

// Actualizar estilos de botones
function actualizarBotones() {
  botones.forEach(function (btn) {
    if (btn.dataset.filtro === filtro) {
      btn.classList.add("activo");
    } else {
      btn.classList.remove("activo");
    }
  });
}

// inicializar la carga de tareas
cargarTareas();
