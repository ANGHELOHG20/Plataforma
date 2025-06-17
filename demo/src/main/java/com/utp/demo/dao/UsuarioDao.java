package com.utp.demo.dao;

import java.util.List;
import com.utp.demo.models.Usuario;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    void eliminarUsuario(Long id);

}
