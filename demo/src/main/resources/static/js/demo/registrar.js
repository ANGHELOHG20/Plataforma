// Call the dataTables jQuery plugin
$(document).ready(function() {
    // vacio
});

async function registrarUsuarios() {
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellido').value;
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;
    
    let repetirPassword = document.getElementById('txtRepetirPassword').value;

    if (repetirPassword != datos.password){
        alert('La contraseñas no coinciden')
        return;
    }

  const request = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (request.ok) {
  alert("🎉 Alumno registrado con éxito");
  // Limpia los campos si quieres
  document.getElementById('txtNombre').value = '';
  document.getElementById('txtApellido').value = '';
  document.getElementById('txtEmail').value = '';
  document.getElementById('txtPassword').value = '';
  document.getElementById('txtRepetirPassword').value = '';

  window.location.href = "index.html";
} else {
  alert("❌ Error al registrar alumno");
}

}

