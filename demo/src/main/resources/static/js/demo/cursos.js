// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarCursos();
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
  const cursos = await request.json();


  let listadoHtml = '';
      for (let curso of cursos) {

        let botonEliminar= '<a href="#" onclick="eliminarCurso('+ curso.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';


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