// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarCursos();
  $('#ordenarPor').on('change', cargarCursos); // cambia el orden cuando seleccionan otro
  $('#cursos').DataTable();
});

async function cargarCursos(){
  const request = await fetch('api/cursos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  let cursos = await request.json();

  // Obtener criterio de ordenamiento
  const criterio = document.getElementById('ordenarPor').value;

  // Ordenar según el criterio seleccionado
  cursos.sort((a, b) => {
    if (criterio === "id-asc") return a.id - b.id;
    if (criterio === "id-desc") return b.id - a.id;
    if (criterio === "nombre-asc") return a.nombre.localeCompare(b.nombre);
    if (criterio === "nombre-desc") return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  let listadoHtml = '';
  for (let curso of cursos) {
    let botonEliminar = '<a href="#" onclick="eliminarCurso('+ curso.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let cursoHtml = '<tr><td>'+curso.id+'</td><td>' + curso.nombre + '</td><td>' +  botonEliminar +'</td></tr>';
    listadoHtml += cursoHtml;
  }

  document.querySelector('#cursos tbody').innerHTML = listadoHtml;
}

async function eliminarCurso(id){
  if(!confirm('¿Desea eliminar el curso?')){
    return;
  } 

  const request = await fetch('api/cursos/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  location.reload();
}
