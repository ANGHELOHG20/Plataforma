package com.utp.demo.dao;

import com.utp.demo.models.Curso;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Transactional
@Repository
public class CursoDaoImp implements CursoDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Curso> getCursos(){
        String query="FROM Curso";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminarCurso(Long id){
        Curso curso = entityManager.find(Curso.class, id);
        entityManager.remove(curso);
    }

}
