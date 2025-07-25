package com.utp.demo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.utp.demo.models.Profesor;
import com.utp.demo.models.Usuario;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
@Transactional
public class ProfesorDaoImp implements ProfesorDao{
    
    @PersistenceContext
    EntityManager entityManager;
    
    @Override
    public List<Profesor> getProfesores(){
        String query = "FROM Profesor";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public List<Profesor> buscarPorNombre(String nombre) {
        String query = "FROM Profesor WHERE LOWER(nombre) LIKE :nombre OR LOWER(apellido) LIKE :nombre";
        return entityManager.createQuery(query)
            .setParameter("nombre", "%" + nombre.toLowerCase() + "%")
            .getResultList();
    }

    @Override
    public void eliminarProfesor(Long id) {
        Profesor profesor = entityManager.find(Profesor.class, id);
        entityManager.remove(profesor);
    }

    @Override
    public void registrar(Profesor profesor) {
        entityManager.detach(profesor);
        entityManager.merge(profesor);
    }

}
