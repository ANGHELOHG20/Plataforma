package com.utp.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.utp.demo.dao.UsuarioDao;
import com.utp.demo.models.Usuario;


import java.util.List;


@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuario/{id}")
    public Usuario getUsuario(@PathVariable Long id) {
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNombre("Anghelo");
        usuario.setApellido("Gato");
        usuario.setEmail("@gato.com");
        usuario.setTelefono("972390606");
        usuario.setPassword("gato1");
        return usuario;
    }

    @GetMapping("api/usuarios")
    public List<Usuario> getUsuarios(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return usuarioDao.buscarPorNombre(search);
        }
            return usuarioDao.getUsuarios();
    }


    @RequestMapping(value = "usuario2")
    public Usuario editarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Anghelo");
        usuario.setApellido("Gato");
        usuario.setEmail("@gato.com");
        usuario.setTelefono("972390606");
        usuario.setPassword("gato1");

        return usuario;
    }

     @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminaruUsuario(@PathVariable Long id) {
        usuarioDao.eliminarUsuario(id);
    }

    @RequestMapping(value = "usuario4")
    public Usuario buscarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Anghelo");
        usuario.setApellido("Gato");
        usuario.setEmail("@gato.com");
        usuario.setTelefono("972390606");
        usuario.setPassword("gato1");

        return usuario;
    }
}
