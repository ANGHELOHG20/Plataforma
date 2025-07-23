// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
});

async function cargarUsuarios() {
  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const usuarios = await request.json();

   // Obtener criterio de ordenamiento
  const criterio = document.getElementById('ordenarPor').value;

  // Ordenar según el criterio seleccionado
  usuarios.sort((a, b) => {
    if (criterio === "id-asc") return a.id - b.id;
    if (criterio === "id-desc") return b.id - a.id;
    if (criterio === "nombre-asc") return a.nombre.localeCompare(b.nombre);
    if (criterio === "nombre-desc") return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  renderizarUsuarios(usuarios);
}


async function eliminarUsuario(id) {
  if (!confirm('¿Desea eliminar al usuario?')) {
    return;
  }

  const request = await fetch('api/usuarios/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  location.reload();
}

async function filtrarUsuarios(texto) {
  const request = await fetch('api/usuarios?search=' + texto, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const usuarios = await request.json();
  renderizarUsuarios(usuarios);
}

function renderizarUsuarios(usuarios) {
  let listadoHtml = '';
  for (let usuario of usuarios) {
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>'
      + usuario.email + '</td><td>' + usuario.telefono + '</td><td>' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }
  document.querySelector('#usuarios tbody').innerHTML = listadoHtml;
}

// Tiempo real
document.getElementById("buscarInput").addEventListener("keyup", function () {
  const texto = this.value.trim();
  if (texto === '') {
    cargarUsuarios();
  } else {
    filtrarUsuarios(texto);
  }
});
