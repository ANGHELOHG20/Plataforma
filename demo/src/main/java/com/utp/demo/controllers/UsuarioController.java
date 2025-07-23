package com.utp.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.utp.demo.dao.UsuarioDao;
import com.utp.demo.models.Usuario;

import java.lang.reflect.Method;
import java.util.List;


@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @GetMapping("api/usuarios")
    public List<Usuario> getUsuarios(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return usuarioDao.buscarPorNombre(search);
        }
            return usuarioDao.getUsuarios();
    }
    
    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {
            usuarioDao.registrar(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminaruUsuario(@PathVariable Long id) {
        usuarioDao.eliminarUsuario(id);
    }
}
