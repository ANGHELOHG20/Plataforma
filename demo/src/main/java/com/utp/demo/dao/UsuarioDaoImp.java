
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
}

