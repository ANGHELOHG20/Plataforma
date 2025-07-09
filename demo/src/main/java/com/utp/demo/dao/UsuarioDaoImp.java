
package com.utp.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.utp.demo.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional

public class UsuarioDaoImp implements UsuarioDao{

    @PersistenceContext
    EntityManager entityManager;
    
    @Override
    public List<Usuario> getUsuarios(){
        String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<Usuario> buscarPorNombre(String nombre) {
        String query = "FROM Usuario WHERE LOWER(nombre) LIKE :nombre OR LOWER(apellido) LIKE :nombre";
        return entityManager.createQuery(query)
            .setParameter("nombre", "%" + nombre.toLowerCase() + "%")
            .getResultList();
    }

    @Override
    public void eliminarUsuario(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }
}

