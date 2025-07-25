// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarProfesores();
  $('#profesores').DataTable();
});

// Cargar todos los profesores o aplicar ordenamiento
async function cargarProfesores(){
  const request = await fetch('api/profesores', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const profesores = await request.json();

  const criterio = document.getElementById('ordenarPor')?.value || '';

  profesores.sort((a, b) => {
    if (criterio === "id-asc") return a.id - b.id;
    if (criterio === "id-desc") return b.id - a.id;
    if (criterio === "nombre-asc") return a.nombre.localeCompare(b.nombre);
    if (criterio === "nombre-desc") return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  let listadoHtml = '';
  for (let profesor of profesores) {
    let botonEliminar = '<a href="#" onclick="eliminarProfesor('+ profesor.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let profesorHtml = '<tr><td>'+profesor.id+'</td><td>' + profesor.nombre + ' ' + profesor.apellido + '</td><td>'
                      + profesor.email+'</td><td>'+profesor.telefono + '</td><td>' + profesor.curso
                      + '</td><td>'+ botonEliminar +'</td></tr>';
    listadoHtml += profesorHtml;
  }
  document.querySelector('#profesores tbody').innerHTML = listadoHtml;
}

// Eliminar profesor
async function eliminarProfesor(id){
  if(!confirm('¿Desea eliminar al profesor?')){
    return;
  } 

  await fetch('api/profesores/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  location.reload();
}

// FILTRADO POR NOMBRE (AGREGADO)
async function filtrarProfesores(texto) {
  // AGREGADO: solicitud con parámetro `search`
  const request = await fetch('api/profesores?search=' + encodeURIComponent(texto), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const profesores = await request.json();

  let listadoHtml = '';
  for (let profesor of profesores) {
    let botonEliminar = '<a href="#" onclick="eliminarProfesor('+ profesor.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let profesorHtml = '<tr><td>'+profesor.id+'</td><td>' + profesor.nombre + ' ' + profesor.apellido + '</td><td>'
                      + profesor.email+'</td><td>'+profesor.telefono + '</td><td>' + profesor.curso
                      + '</td><td>'+ botonEliminar +'</td></tr>';
    listadoHtml += profesorHtml;
  }

  document.querySelector('#profesores tbody').innerHTML = listadoHtml;
}

// Evento para buscar mientras se escribe
document.getElementById("buscarInput").addEventListener("keyup", function () {
  const texto = this.value.trim();
  if (texto === '') {
    cargarProfesores();
  } else {
    filtrarProfesores(texto);  // LLAMA A LA FUNCIÓN QUE HACE EL FILTRADO
  }
});
