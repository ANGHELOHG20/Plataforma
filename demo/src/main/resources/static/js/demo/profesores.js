// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarProfesores();
  $('#profesores').DataTable();
});

async function cargarProfesores(){
  const request = await fetch('api/profesores', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const profesores = await request.json();


  let listadoHtml = '';
      for (let profesor of profesores) {

        let botonEliminar= '<a href="#" onclick="eliminarProfesor('+ profesor.id +')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';


        let profesorHtml = '<tr><td>'+profesor.id+'</td><td>' + profesor.nombre + ' ' + profesor.apellido + '</td><td>'
                          + profesor.email+'</td><td>'+profesor.telefono + '</td><td>' + profesor.curso
                          + '</td><td>'+ botonEliminar +'</td></tr>';
        listadoHtml += profesorHtml;
      }
      document.querySelector('#profesores tbody').innerHTML = listadoHtml;

}

async function eliminarProfesor(id){

  if(!confirm('¿Desea eliminar al profesor?')){
    return;
  } 

   const request = await fetch('api/profesores/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  location.reload();
}