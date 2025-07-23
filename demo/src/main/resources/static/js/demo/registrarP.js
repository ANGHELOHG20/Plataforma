// Call the dataTables jQuery plugin
$(document).ready(function() {
    // vacio
});

async function registrarProfesor() {
    let datosp = {};
    datosp.nombre = document.getElementById('txtNombrep').value;
    datosp.apellido = document.getElementById('txtApellidop').value;
    datosp.email = document.getElementById('txtEmailp').value;
    datosp.curso= document.getElementById('txtCursop').value;
    datosp.telefono= document.getElementById('txtTelefonop').value;
    datosp.password = document.getElementById('txtPasswordp').value;
    
    let repetirPassword = document.getElementById('txtRepetirPasswordp').value;

    if (repetirPassword != datosp.password){
        alert('La contraseñas no coinciden')
        return;
    }

  const request = await fetch('api/profesores', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosp)
  });

  if (request.ok) {
  alert("🎉 Profesor registrado con éxito");
  // Limpia los campos si quieres
  document.getElementById('txtNombrep').value = '';
  document.getElementById('txtApellidop').value = '';
  document.getElementById('txtEmailp').value = '';
  document.getElementById('txtPasswordp').value = '';
  document.getElementById('txtRepetirPasswordp').value = '';

  window.location.href = "index.html";
} else {
  alert("❌ Error al registrar profesor");
}

}

